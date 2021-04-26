const submitAnswerController = require('../controllers/submitAnswer.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {

    app.post('/submitAnswer', isLoggedIn, submitAnswerController.submitAnswer);

    app.post('/addComment', isLoggedIn, submitAnswerController.addComment);
};