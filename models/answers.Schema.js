var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var answersSchema = mongoose.Schema({
    AnswerDescription: String,
    PostedBy: Number,
    AnswererName: String,
    AnswererTypeID:Number,
    QuestionsID: Number,
    AnsweredDate: Date,
    Comments:[],
    Star: [

        {
            StaredBy: Number
        }
    ],
    Like:[{type:Number}],
    Dislike:[{type:Number}]

});

//Validate Data
answersSchema.plugin(validator);

//Add Auto Increment To Event ID
answersSchema.plugin(AutoIncrement, {
    modelName: 'answers',
    type: Number,
    unique: true,
    fieldName: 'AnswerID'
});

module.exports = mongoose.model('answers', answersSchema);