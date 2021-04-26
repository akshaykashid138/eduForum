var userSchema = require('../models/user.Schema');
var studentSchema = require('../models/student.Schema');
var teacherSchema = require('../models/teacher.Schema');

var testSchema = require('../models/test.Schema');

//method to increment rewardPoints in testSchema
exports.incrementTestPoints = function (req,res) {
    testSchema.findOneAndUpdate({TestID:req.body.TestID},{$inc:{PointsCollected:req.body.JoiningPoints }},function (err)
    {
        if(err){

            res.sendStatus(500);
        }

        else
            res.sendStatus(201);

    })

};

//method to increment rewardPoints of teacher
exports.incrementTeacherPoints = function (req,res) {
    teacherSchema.findOneAndUpdate({UserID:req.body.CreatedBy},{$inc:{RewardsPoints:req.body.JoiningPoints }},function (err)
    {
        if(err){

            res.sendStatus(500);
        }

        else
            res.sendStatus(201);

    })

};


//method to decrement student rewardPoints
exports.decrementStudentPoints = function (req,res) {
    studentSchema.findOneAndUpdate({UserID:req.body.StuID},{$inc:{RewardsPoints:-(req.body.JoiningPoints) }},function (err)
    {
        if(err){

            res.sendStatus(500);
        }

        else
            res.sendStatus(201);

    })

};

//method to decrement teacher rewardPoints
exports.decrementTeacherPoints = function (req,res) {
    teacherSchema.findOneAndUpdate({UserID:req.body.CreatedBy},{$inc:{RewardsPoints:-(req.body.WinningPoints) }},function (err)
    {
        if(err){

            res.sendStatus(500);
        }

        else
            res.sendStatus(201);

    })

};

//method to increment rewardPoints of teacher
exports.incrementStudentPoints = function (req,res) {
    studentSchema.findOneAndUpdate({UserID:req.body.StuID},{$inc:{RewardsPoints:req.body.WinningPoints }},function (err)
    {
        if(err){

            res.sendStatus(500);
        }

        else
            res.sendStatus(201);

    })

};

//method to get StudentRewardsPoints
exports.getStudentRewardsPoints = function (req,res) {
    studentSchema.findOne({UserID:parseInt(req.query.UserID)},function (err,record) {
      if(err)
          throw err;
      else
            res.send(record)
    })

};

//method to get TeacherRewardsPoints
exports.getTeacherRewardsPoints = function (req,res) {
    teacherSchema.findOne({UserID:parseInt(req.query.UserID)},function (err,record) {
        if(err)
            throw err;
        else
            res.send(record)
    })

};