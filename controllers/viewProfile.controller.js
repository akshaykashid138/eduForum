var userSchema = require('../models/user.Schema');
var studentSchema = require('../models/student.Schema');

//Method To Render View Profile Page
exports.renderViewProfile = function (req, res) {
    res.render("ViewProfile/viewProfile");
};

//to view student user profile
exports.viewStudentProfile = function (req,res) {
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

//to view teacher user profile
exports.viewTeacherProfile = function (req,res) {
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
