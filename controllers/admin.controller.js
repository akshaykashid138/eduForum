var userSchema = require('../models/user.Schema');
var studentSchema = require('../models/student.Schema');
var teacherSchema = require('../models/teacher.Schema');

//Render Admin Home Page
exports.renderAdminHomePage = function (req, res) {

    res.render('SuperAdmin/Home/adminHome');
};

//Render Manage Students Page
exports.renderManageStudentsPage = function (req,res) {
    res.render('SuperAdmin/ManageStudents/manageStudents')

};

//Render Manage Teachers Page
exports.renderManageTeachersPage = function (req,res) {
    res.render('SuperAdmin/ManageTeachers/manageTeachers')

};

//Create Test
exports.createTest = function (req,res) {

    let newTest = new testSchema(req.body);
    newTest.save(function (err) {
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
            return res.status(201).send({url: req.session.sessionAllowedUrls[0]});
        }

    })

}


exports.getAllStudents = function (req,res) {

    userSchema.aggregate([
        {
            $match: {
                'UserTypeID':3
            }
        },

        {

            $lookup:{
                from:'students',
                localField: 'UserID',
                foreignField:'UserID',
                as:'user'
            }
        },

        {
            $project:{
                _id:0,
                 UserID:1,
                 EmailID:1,
                IsVerified:1,
                // Password:0,
              // FullName:1,



                Students:'$user'


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


exports.getAllTeachers = function (req,res) {

    userSchema.aggregate([
        {
            $match: {
                'UserTypeID':2
            }
        },

        {

            $lookup:{
                from:'teachers',
                localField: 'UserID',
                foreignField:'UserID',
                as:'user'
            }
        },

        {
            $project:{
                _id:0,
                UserID:1,
                EmailID:1,
                IsVerified:1,
                // Password:0,
                // FullName:1,



                Teachers:'$user'


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


exports.renderApproveTeachersPage = function (req,res) {
    res.render('SuperAdmin/ApproveTeachers/approveTeachers');

};

//method to get unverified teachers
exports.getTeachers = function (req,res) {
    userSchema.aggregate([
        {
            $match: {
                'UserTypeID':2,
                'IsVerified':false
            }
        },

        {

            $lookup:{
                from:'teachers',
                localField: 'UserID',
                foreignField:'UserID',
                as:'user'
            }
        },

        {
            $project:{
                _id:0,
                UserID:1,
                EmailID:1,
                IsVerified:1,
                // Password:0,
                // FullName:1,



                Teachers:'$user'


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

//Method to disable student
exports.disableStudent = function (req,res) {

    userSchema.findOneAndUpdate({UserID:req.body.UserID},{$set:{IsVerified:false}},function (err) {
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

            return res.sendStatus(201);
        }


    })

};

//Method to enable student
exports.enableStudent = function (req,res) {

    userSchema.findOneAndUpdate({UserID:req.body.UserID},{$set:{IsVerified:true}},function (err) {
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
            return res.sendStatus(201);
        }


    })

};


exports.disableTeacher = function (req,res) {

    userSchema.findOneAndUpdate({UserID:req.body.UserID},{$set:{IsVerified:false}},function (err) {
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

            return res.sendStatus(201);
        }

    })

}


exports.enableTeacher = function (req,res) {

    userSchema.findOneAndUpdate({UserID:req.body.UserID},{$set:{IsVerified:true}},function (err) {
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

            return res.sendStatus(201);
        }

    })

}