const viewQuestionController = require('../controllers/viewQuestion.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    app.get('/viewQuestion', isLoggedIn, viewQuestionController.viewQuestionPage);
  //  app.post('/', isLoggedIn, askQuestionController.);

    //like answer
    app.post('/like',isLoggedIn,viewQuestionController.like);

    //Unlike answer
    app.post('/unlike',isLoggedIn,viewQuestionController.unlike);

    //add Views
    app.post('/views',isLoggedIn,viewQuestionController.views);

    //Increment Answer Count
    app.post('/ansCount',isLoggedIn,viewQuestionController.ansCount);

    //star Question
    app.post('/star',isLoggedIn,viewQuestionController.star);

    //Unlike answer
    app.post('/unStar',isLoggedIn,viewQuestionController.unStar);

};