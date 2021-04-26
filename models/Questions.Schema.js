var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var questionsSchema = mongoose.Schema({

    QuestionTitle: String,
    QuestionDescription: String,
    Tags: [{text: String}],
    CreatedBy: Number,
    CreatorName:String,
    CreatedDate: Date,
    AnswersCount:{type:Number,default:0},
    Views:[{type:Number}],
    Stars:Number

});

//Validate Data
questionsSchema.plugin(validator);

//Add Auto Increment To Event ID
questionsSchema.plugin(AutoIncrement, {
    modelName: 'questions',
    type: Number,
    unique: true,
    fieldName: 'QuestionsID'
});


module.exports = mongoose.model('questions', questionsSchema);