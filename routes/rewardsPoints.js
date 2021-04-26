const rewardsPointsController = require('../controllers/rewardsPoints.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {

//route to increment points in testSchema
    app.post('/incrementTestPoints',isLoggedIn,rewardsPointsController.incrementTestPoints);

    //route to increment teacher points
    app.post('/incrementTeacherPoints',isLoggedIn,rewardsPointsController.incrementTeacherPoints);

    //route to decrement student points
    app.post('/decrementStudentPoints',isLoggedIn,rewardsPointsController.decrementStudentPoints);

    //route to decrement teacher points
    app.post('/decrementTeacherPoints',isLoggedIn,rewardsPointsController.decrementTeacherPoints);

    //route to increment student points in users
    app.post('/incrementStudentPoints',isLoggedIn,rewardsPointsController.incrementStudentPoints);

    //route to get Student RewardsPoints
    app.get('/getStudentRewardsPoints',isLoggedIn,rewardsPointsController.getStudentRewardsPoints);

    //route to get Teacher RewardsPoints
    app.get('/getTeacherRewardsPoints',isLoggedIn,rewardsPointsController.getTeacherRewardsPoints);
};