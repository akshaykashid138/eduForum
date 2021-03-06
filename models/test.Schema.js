var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var testSchema = mongoose.Schema({
    TestName : {type: String, unique: "Test With Same Name Already Exist"},
    NumberOfQuestions : Number,
    TestDescription : String,
    Tags : String,
    Marks: Number,
    Duration: {type: Number, default: 0},
    CreatedBy: Number,
    CreatedDate : Date,
    JoiningPoints : Number,
    WinningPoints : Number,
    MinimumUsersToJoin : Number,
    PointsCollected:{type:Number,default:0},
    AttemptedBy : []

});

//Validate Data
testSchema.plugin(validator);

//Add Auto Increment To Event ID
testSchema.plugin(AutoIncrement, {
    modelName: 'tests',
    type: Number,
    unique: true,
    fieldName: 'TestID'
});



module.exports = mongoose.model('tests', testSchema);