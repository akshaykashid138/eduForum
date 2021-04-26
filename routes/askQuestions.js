const askQuestionController = require('../controllers/askQuestions.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    app.get('/askQuestion', isLoggedIn, askQuestionController.askQuestionPage);
    app.post('/askQuestion', isLoggedIn, askQuestionController.askQuestion);

};