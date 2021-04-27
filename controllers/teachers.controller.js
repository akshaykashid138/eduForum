var testSchema= require('../models/test.Schema');
var testQuestionsSchema = require('../models/testQuestions.Schema');
var techerSchema = require('../models/teacher.Schema');
var userSchema = require('../models/user.Schema');
var testResult = require('../models/testResults.Schema');

//_____ Method To Render Teachers Page

exports.renderTeacherHomePage = function (req, res) {

    res.render('Teachers/Home/teacherHome');
};

exports.renderTestPage = function (req, res) {

    res.render('Teachers/createdTests');
};

exports.viewTestReport = function (req, res) {
    testResult.find({TestID:parseInt(req.query.TestID)},{TestName:1,Result:1},function (err,record) {
        if(err)
            throw err;
        else{
            console.log(record)
            res.render('Teachers/ViewTestReport/viewTestReport',{Report:record});
        }

    })

};



exports.renderCreateTestPage = function (req, res) {

    res.render('Teachers/CreateTest/createTest');
};

//Create Test
exports.createTest = function (req,res) {

    let newTest = new testSchema(req.body);
    newTest.save(function (err,test) {
        if(err)
        {
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
        else{
            return res.status(201).send(test);
        }

    })

};

exports.renderManageTestQuestionsPage = function (req,res) {

    testSchema.findOne({TestID: parseInt(req.query.TestID)}, function (err, test) {
        if (err)
            throw err;
        else
            res.render("Teachers/ManageTestQuestions/manageTestQuestions", {
                TestID: test.TestID,
                NumberOfQuestions: test.NumberOfQuestions,
                TestName: test.TestName
            })
    })


}

exports.manageTestQuestions = function (req,res) {

    testQuestionsSchema.findOne({TestID: req.body.TestID}, function (err, doc) {
        if (err)
            return res.sendStatus(500);
        else if (doc) {
            return res.sendStatus(200);
        } else if (!doc) {
            let newTestQuestions = new testQuestionsSchema(req.body);
            newTestQuestions.save(function (err) {
                if (err)
                    return res.sendStatus(500);
                else
                    return res.sendStatus(201);
            });
        }
    })

};

exports.renderManageTestsPage = function (req,res) {
    res.render('Teachers/ManageTests/manageTests');

};

exports.getTests = function (req,res) {
    testSchema.find({CreatedBy:req.query.UserID},function (err,record) {
        if (err) {
            throw err;
        }
        else {

            res.send(record)
        }

})

};

//Method to get Teacher Profile
exports.getTeacherProfile = function (req,res) {
    userSchema.aggregate([
        {
            $match: {
                'UserID':parseInt(req.query.UserID)

            }
        },
        {
            $lookup:{
                from:'teachers',
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
exports.updateTeacherProfile = function (req,res) {
    techerSchema.findOneAndUpdate({TeacherID:req.body.TeacherID},{$set:req.body},function (err) {
        if (err) {
            if (err.name === 'ValidationError') {
                let errorMessages = err.message.replace("teacher validation failed:", "");
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

exports.deleteTest = function (req,res) {
    testSchema.findOneAndDelete({TestID:parseInt(req.query.TestID)},function (err) {
        if(err)
            res.sendStatus(500);
        else{
            testQuestionsSchema.findOneAndRemove({TestID:parseInt(req.query.TestID)},function (err) {
                if(err)
                   return res.sendStatus(500);
                else
                   return res.sendStatus(201);
            })
        }

    })

}

