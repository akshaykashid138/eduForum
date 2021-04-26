var userSchema = require('../models/user.Schema');
var studentSchema = require('../models/student.Schema');
var transporter = require('../lib/mailer');
const bcrypt = require('bcrypt');
//Method to render Student Registration Page
exports.renderStudentRegistrationPage = function (req,res) {
    res.render("StudentRegistration/signup");

};

//Method to Register New Student
exports.registerNewStudent = async (req,res)=>{
    console.log(req.body)
    let newUser = req.body;
    newUser.Password = await bcrypt.hash(req.body.Password, 10);
    newUser = new userSchema(newUser);
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
            let newStudent = req.body;
            newStudent.UserID = user.UserID;
            newStudent = new studentSchema(newStudent);
            newStudent.save(function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }

                else {
                    var mailOptions = {
    from: 'eduforumdevs@gmail.com',
    to: user.EmailID,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
                    res.sendStatus(201);
                }
            });
        }

    })


}