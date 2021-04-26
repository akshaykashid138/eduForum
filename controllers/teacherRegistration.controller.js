var userSchema = require('../models/user.Schema');
var teacherSchema = require('../models/teacher.Schema');
const bcrypt = require('bcrypt');

//Method to render Teacher Registration Page
exports.renderTeacherRegistrationPage = function (req,res) {

    res.render("TeacherRegistration/signup");

};

//Method to Register New Teacher
exports.registerNewTeacher = async (req,res)=> {
    console.log(req.body);
    let newUser = req.body;
    newUser.Password = await bcrypt.hash(req.body.Password, 10);
    newUser = new userSchema(newUser);
    // let newUser = new userSchema(req.body);
    newUser.save(function (err,user) {
        if(err){
            console.log(err)
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
            let newTeacher = req.body;
            newTeacher.UserID = user.UserID;
            newTeacher = new teacherSchema(newTeacher);
            newTeacher.save(function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }

                else
                    res.sendStatus(201);
            });
        }

    })


}