var questionsSchema = require('../models/Questions.Schema');
var answerSchema = require('../models/answers.Schema');

//Method to save Answer
exports.submitAnswer = function (req,res) {

   console.log(req.body);
    let newAnswer = new answerSchema(req.body);
    newAnswer.save(function (err) {
        if(err)
        {  console.log(err)
;            if (err.name === 'ValidationError') {
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


};


//Method to add Comment
exports.addComment = function (req,res) {

    answerSchema.findOneAndUpdate({AnswerID:req.body.AnswerID},{$push:{Comments:req.body.Comments}},function (err) {
        if(err)
        {   console.log(err)
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
            return res.sendStatus(201)
        }

    })


};