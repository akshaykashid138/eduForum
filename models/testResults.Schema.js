var mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);

var testResultsSchema = mongoose.Schema({
    TestName: String,
    TestID: Number,
    Result: []


});

//Validate Data
testResultsSchema.plugin(validator);

//Add Auto Increment To Event ID
testResultsSchema.plugin(AutoIncrement, {
    modelName: 'testResults',
    type: Number,
    unique: true,
    fieldName: 'ResultID'
});

module.exports = mongoose.model('testResults', testResultsSchema);