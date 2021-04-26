var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var studentSchema = mongoose.Schema({
    FullName: String,
    UserID: {type: Number, unique: "User With This UserID Already Exist"},
    TestResult: [
        {
            TestName: String,
            Percentage: Number
        }

    ],
    College: String,
    Education: String,
    Location: String,
    Skills: String,
    RewardsPoints: {type: Number, default: 100},
    image: String

});

//Validate Data
studentSchema.plugin(validator);

//Add Auto Increment To Event ID
studentSchema.plugin(AutoIncrement, {
    modelName: 'students',
    type: Number,
    unique: true,
    fieldName: 'StudentID'
});

module.exports = mongoose.model('students', studentSchema);