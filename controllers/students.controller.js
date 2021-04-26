var userSchema = require('../models/user.Schema');
var questionsSchema = require('../models/Questions.Schema');
var studentSchema = require('../models/student.Schema');
var testSchema = require('../models/test.Schema');
var testQuestionsSchema = require('../models/testQuestions.Schema');
var testResultsSchema = require('../models/testResults.Schema');


//****************************************** Controller Methods For Index Page ***************************************//

//_____ Method To Render Students Page

exports.viewTestPage = function (req, res) {

    res.render('Students/ViewTests/viewTests');
};

exports.renderStudentsHomePage = function (req, res) {
    res.render('Students/Home/studentHome');


};

exports.getRecentlyAskedQuestions = function (req,res) {

    questionsSchema.find({},{
        _id: 0,
        QuestionTitle:1,
        QuestionsID: 1,
        CreatorName:1,
        CreatedDate: 1,
        AnswersCount:1,
        Views:1,
        Tags:1

    }, function (err, record) {
        if (err) {
            throw err;
        }
        else {
            console.log(record)
            res.send(record)
        }
    })
};

exports.renderAttemptedTestPage = function (req, res) {

    res.render('Students/AttemptedTests/attemptedTest');
};

exports.renderStudentReportsPage = function (req, res) {

    res.render('Students/Reports/reports');

};

exports.renderTagsPage = function (req, res) {

    res.render('Students/Tags/tags');

};

exports.getAllTests = function (req, res) {
    testSchema.find({AttemptedBy:{$nin:parseInt(req.query.UserID)}}, function (err, record) {
        if (err) {
            throw err;
        }
        else {

            res.send(record)
        }

    })

};

exports.getAttemptedTests = function (req,res) {
    testSchema.find({AttemptedBy:{$in:parseInt(req.query.UserID)}}, function (err, record) {
        if (err) {
            throw err;
        }
        else {

            res.send(record)
        }

    })

}

exports.testPage = function (req, res) {
    res.render('Students/TestPage/testPage')
};

exports.getTestQuestions = function (req, res) {
    testQuestionsSchema.find({TestID: parseInt(req.query.TestID)}, function (err, record) {
        if (err) {

            throw err;
        }
        else {
            console.log(record);
            res.send(record);
        }

    })

};

//save result to testResults Schema
exports.saveResult = function (req, res) {
    testResultsSchema.findOne({TestName: req.body.TestName}, function (err, record) {
        if (err) {
            return res.sendStatus(500);
        }
        else if (!record) {
            let newResult = new testResultsSchema(req.body);
            newResult.save(function (err) {
                if (err) {
                    if (err.name === 'ValidationError') {
                        let errorMessages = err.message.replace("users validation failed:", "");
                        errorMessages = errorMessages.split(',');
                        for (let i = 0; i < errorMessages.length; i++) {
                            errorMessages[i] = errorMessages[i].split(':')[1];
                        }
                        res.status(200).send({message: errorMessages});
                    } else {
                        res.sendStatus(500);
                    }
                }
                else {
                    res.sendStatus(201);
                }

            })
        }
        else if (record) {
            testResultsSchema.findOneAndUpdate({TestName: req.body.TestName}, {$push: {Result: req.body.Result}}, function (err) {
                if (err) {
                    if (err.name === 'ValidationError') {
                        let errorMessages = err.message.replace("users validation failed:", "");
                        errorMessages = errorMessages.split(',');
                        for (let i = 0; i < errorMessages.length; i++) {
                            errorMessages[i] = errorMessages[i].split(':')[1];
                        }
                        res.status(200).send({message: errorMessages});
                    } else {
                        res.sendStatus(500);
                    }
                }
                else {
                    res.sendStatus(201);
                }

            })
        }

    })

};

//save result to student Schema
exports.saveResultToStuSchema = function (req,res) {
    var TestResult ={};
    TestResult.TestName = req.body.TestName;
    TestResult.TestID = req.body.TestID;
    TestResult.Percentage = req.body.Percentage;
    console.log(TestResult);
    console.log(req.body.UserID);
    studentSchema.findOneAndUpdate({UserID:req.body.UserID},{$push: {TestResult: TestResult}},function (err) {
        console.log(err);
        if (err) {
            if (err.name === 'ValidationError') {
                let errorMessages = err.message.replace("data validation failed:", "");
                errorMessages = errorMessages.split(',');
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                res.status(200).send({message: errorMessages});
            } else {
                res.sendStatus(500);
            }
        }
        else {
            res.sendStatus(201);
        }
    })

};

exports.getResults = function (req, res) {
    studentSchema.find({UserID: parseInt(req.query.UserID)},{TestResult:1}, function (err, record) {
        if (err) {

            throw err;
        }
        else {
            console.log(record);
            res.send(record);
        }

    })

};

exports.testPageNew = function (req, res) {
    res.render('Students/TestPage/testPages')
};

//Method to get Student Profile
exports.getStudentProfile = function (req,res) {
    userSchema.aggregate([
        {
            $match: {
                'UserID':parseInt(req.query.UserID)

            }
        },
        {
            $lookup:{
                from:'students',
                localField: 'UserID',
                foreignField:'UserID',
                as:'personalData'
            }
        },
        {
            $project:{
                _id:0,
                UserID:1,
                EmailID:1,
                // Password:0,
                // FullName:1,

                PersonalData:'$personalData'


            }
        }
    ]).exec(function (err,record) {
        if(err)
            res.sendStatus(500);
        else{
            res.send(record);
        }

    })

};

//Method to update Student Profile
exports.updateStudentProfile = function (req,res) {
    studentSchema.findOneAndUpdate({StudentID:req.body.StudentID},{$set:req.body},function (err) {
        if (err) {
            if (err.name === 'ValidationError') {
                let errorMessages = err.message.replace("student validation failed:", "");
                errorMessages = errorMessages.split(',');
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                res.status(200).send({message: errorMessages});
            } else {
                res.sendStatus(500);
            }
        }
        else {
            res.sendStatus(201);
        }
    })

};

//method to get test details on testpage
exports.getTestDetails = function (req,res) {
    testSchema.findOne({TestID:parseInt(req.query.TestID)},function (err,record) {
        if(err)
            res.sendStatus(500);
        else
            res.send(record)

    })

};

//method to update AttemptedBy in tests schema
exports.testAttemptedBy = function (req,res) {
    testSchema.findOneAndUpdate({TestID:req.body.TestID},{$push:{AttemptedBy:parseInt(req.body.StudentID)}},function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    })

};





