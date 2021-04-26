var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var teacherSchema = mongoose.Schema({
    FullName: String,
    UserID: {type: Number, unique: "User With This UserID Already Exist"},
    Qualification: String,
    Stream: String,
    Experience: Number,
    Location: String,
    Skills: String,
    RewardsPoints :{type:Number,default:100},
    image:String
});

//Validate Data
teacherSchema.plugin(validator);

//Add Auto Increment To Event ID
teacherSchema.plugin(AutoIncrement, {
    modelName: 'teachers',
    type: Number,
    unique: true,
    fieldName: 'TeacherID'
});

module.exports = mongoose.model('teachers', teacherSchema);