var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var userSchema = mongoose.Schema({
    FullName: String,
    EmailID: {type: String, unique: "User With This Email ID Already Exist"},
    Password: String,
    UserTypeID: Number,
    IsVerified: Boolean

});

//Validate Data
userSchema.plugin(validator);

//Add Auto Increment To Event ID
userSchema.plugin(AutoIncrement, {
    modelName: 'users',
    type: Number,
    unique: true,
    fieldName: 'UserID'
});

module.exports = mongoose.model('users', userSchema);