var questionsSchema = require('../models/Questions.Schema');
exports.renderActivityLog = function (req, res) {
    res.render("ActivityLog/activityLog");
};

exports.getSelfAskedQuestions = function (req,res) {

    questionsSchema.find({CreatedBy:parseInt(req.query.UserID)},{
        _id: 0,
        QuestionTitle:1,
        QuestionsID: 1,
        CreatorName:1,
        CreatedDate: 1,
        AnswersCount:1,
        Views:1,
        Tags:1

    }, function (err, record) {
        if (err) {
            throw err;
        }
        else {
            console.log(record)
            res.send(record)
        }
    })
};