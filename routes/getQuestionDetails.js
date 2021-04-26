const getQuestionDetailsController = require('../controllers/getQuestionDetails.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    app.get('/getQuestionDetails', isLoggedIn, getQuestionDetailsController.getQuestionDetails);
};