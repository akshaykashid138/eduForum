var userSchema = require('../models/user.Schema');
var transporter = require('../lib/mailer');

//Method To Render Home Page
exports.renderHomePage = function (req, res) {
    res.render("Home/home");
};

//Forgot Password
exports.renderForgotPasswordPage = function (req,res) {
    //render forgot password page
    res.render('ForgotPassword/forgotPassword');

};

exports.getPassword = function (req,res) {
    console.log("in get password controller "+req.query.EmailID);
    userSchema.findOne({EmailID:req.query.EmailID},
        function (err,user) {
        
        if (err)
            return res.sendStatus(500);
        else if (!user)
            return res.status(200).send({message: "User Does Not Exist"});
        else if(user)
        {
            var mailOptions = {
                from: 'eduforumdevs@gmail.com',
                to: user.EmailID,
                subject: 'Your Password',
                text: user.Password
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                } else {
                    console.log('Email sent: ' + info.response);
                   return res.sendStatus(201);
                }
            });

        }

    })


}