var questionsSchema = require('../models/Questions.Schema');
var answersSchema = require('../models/answers.Schema');

// exports.viewQuestionPage = function (req,res) {
//
//     questionsSchema.findOne({QuestionsID:req.query.Q},{_id: 0, QuestionTitle: 1,QuestionDescription:1,Tags:1,
//             CreatedBy:1 ,QuestionsID: 1,CreatedDate:1},
//         function (err,record) {
//         if (err) {
//             throw err;
//         }
//         else {
//             console.log(record);
//
//             res.render('ViewQuestion/viewQuestion',{question:record});
//             //res.send(record);
//         }
//
//     })
//
// };

//
exports.viewQuestionPage=function (req,res) {
// console.log("in view Qestion Page"+req.query.Q);
//     questionsSchema.aggregate([
//         {
//             $match: {
//                 'QuestionsID':parseInt(req.query.Q)
//             }
//         },
//         {
//
//             $lookup:{
//                 from:'answers',
//                 localField: 'QuestionsID',
//                 foreignField:'QuestionsID',
//                 as:'question'
//             }
//         },
//
//         {
//             $project:{
//
//                 QuestionsID:1,
//                 QuestionTitle:1,
//                 QuestionDescription:1,
//                 CreatedBy:1,
//                 CreatedDate:1,
//                 AnswerID:1,
//                 AnswerDescription:1,
//                 PostedBy:1,
//                 AnsweredDate:1,
//                Question: {$arrayElemAt: ["$question", 0]}
//             }
//         }
//         ]).exec(function (err,record) {
//         if(err)
//             res.sendStatus(500);
//         else{
//             console.log(record);
//             res.render('ViewQuestion/viewQuestion',{question:record});
//             //res.send(record);
//         }
//     })
    res.render('ViewQuestion/viewQuestion');

};
//like answer
exports.like = function (req,res) {
    console.log(req.body);
    answersSchema.findOneAndUpdate({AnswerID:req.body.AnswerID},{$push:{Like:req.body.UserID}},function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);

    })


};

//dislike answer
exports.unlike = function (req,res) {
    console.log(req.body);
    answersSchema.findOneAndUpdate({AnswerID:req.body.AnswerID},{$pull:{Like:req.body.UserID}},function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);

    })
};

//add views
exports.views = function (req,res) {
    questionsSchema.findOneAndUpdate({QuestionsID:req.body.QuestionsID},{$addToSet:{Views:req.body.UserID}},function (err) {
        if(err) {
            console.log(err)
            res.sendStatus(500);
        }
        else
            res.sendStatus(201);


    })
};

//Increment Answer Count
exports.ansCount = function (req,res) {
   questionsSchema.findOneAndUpdate({QuestionsID:req.body.QuestionsID},{ $inc: { AnswersCount: +1}},function (err) {
       if(err)
           res.sendStatus(500);
       else
           res.sendStatus(201);
   })

};

//star question
exports.star = function (req,res) {
    console.log(req.body);
    questionsSchema.findOneAndUpdate({QuestionsID:req.body.QuestionsID},{$push:{Stars:req.body.UserID}},function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);

    })


};

//dislike answer
exports.unStar = function (req,res) {
    console.log(req.body);
    questionsSchema.findOneAndUpdate({QuestionsID:req.body.QuestionsID},{$pull:{Stars:req.body.UserID}},function (err) {
        if(err)
            res.sendStatus(500);
        else
            res.sendStatus(201);

    })
};