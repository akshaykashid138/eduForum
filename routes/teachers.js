const teachersController = require('../controllers/teachers.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    //Method To Render Home Page

    app.get('/createdTests',isLoggedIn, teachersController.renderTestPage);

    app.get('/teacherHome',isLoggedIn, teachersController.renderTeacherHomePage);

    app.get('/createTest',isLoggedIn, teachersController.renderCreateTestPage);

    app.post('/createTest',isLoggedIn,teachersController.createTest);

    app.get('/manageTestQuestions',isLoggedIn,teachersController.renderManageTestQuestionsPage);

    app.post('/manageTestQuestions/createQuestions',isLoggedIn,teachersController.manageTestQuestions);

    app.get('/manageTests',isLoggedIn,teachersController.renderManageTestsPage);

    app.get('/getTests',isLoggedIn,teachersController.getTests);

    //route to get Teacher Profile Data
    app.get('/getTeacherProfile',isLoggedIn,teachersController.getTeacherProfile);

    //route to update Teacher Profile
    app.post('/updateTeacherProfile',isLoggedIn,teachersController.updateTeacherProfile);

    //route to delete Test
    app.get('/deleteTest',isLoggedIn,teachersController.deleteTest);

    //route to get test report
    app.get('/viewTestReport',isLoggedIn,teachersController.viewTestReport);
};
