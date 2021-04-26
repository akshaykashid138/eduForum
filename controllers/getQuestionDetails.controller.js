var questionsSchema = require('../models/Questions.Schema');



exports.getQuestionDetails=function (req,res) {
    let Q = parseInt(req.query.Q);
    questionsSchema.aggregate([
        {
            $match: {
                'QuestionsID':Q
            }
        },
        {

            $lookup:{
                from:'answers',
                localField: 'QuestionsID',
                foreignField:'QuestionsID',
                as:'question'
            }
        },

        {
            $project:{
                _id:0,
                QuestionsID:1,
                QuestionTitle:1,
                QuestionDescription:1,
                CreatedBy:1,
                CreatorName:1,
                CreatorType:1,
                CreatedDate:1,
                Stars:1,
                //AnswerID:1,
                //AnswerDescription:1,
                //PostedBy:1,
                //AnsweredDate:1,

               Answers:'$question'
               // Answers: {$arrayElemAt: ["$question", 5]}

            }
        }
    ]).exec(function (err,record) {
        if(err)
            res.sendStatus(500);
        else{

            //res.render('ViewQuestion/viewQuestion',{question:record});
            res.send(record);
        }
    })

};