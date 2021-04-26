var questionsSchema = require('../models/Questions.Schema');
//render ask question page
exports.askQuestionPage = function (req, res) {

    res.render('AskQuestion/askQuestion');
};

//Method to save questions
exports.askQuestion = function (req,res) {
    console.log(req.body);
    let newQuestion = new questionsSchema(req.body);
    newQuestion.save(function (err) {
        if(err)
        {
            if (err.name === 'ValidationError') {
                let errorMessages = err.message.replace("users validation failed:", "");
                errorMessages = errorMessages.split(',');
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessages[i] = errorMessages[i].split(':')[1];
                }
                console.log(err);
                res.status(200).send({message: errorMessages});
            } else {
                console.log(err)
                res.sendStatus(500);
            }
        }
        else{
            return res.status(201).send({url: req.session.sessionAllowedUrls[0]});
        }

    })

};