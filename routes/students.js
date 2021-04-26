const studentsController = require('../controllers/students.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    //Method To Render Home Page
    app.get('/viewTests', isLoggedIn, studentsController.viewTestPage);

    app.get('/studentsHome', isLoggedIn, studentsController.renderStudentsHomePage);

    app.get('/getRecentlyAskedQuestions', studentsController.getRecentlyAskedQuestions);

    //app.get('/manageStudents', manageStudentsController.renderManageStudentsPage);

    app.get('/attemptedTest', isLoggedIn, studentsController.renderAttemptedTestPage);

    app.get('/reports', isLoggedIn, studentsController.renderStudentReportsPage);

    app.get('/tags', isLoggedIn, studentsController.renderTagsPage);

    app.get('/getAllTests', isLoggedIn, studentsController.getAllTests);

    app.get('/getAttemptedTests', isLoggedIn, studentsController.getAttemptedTests);

    app.get('/testPage', isLoggedIn, studentsController.testPage);

    app.get('/testPages', studentsController.testPageNew);

    app.get('/getTestQuestions', isLoggedIn, studentsController.getTestQuestions);

    //save result to testResult Schema
    app.post('/saveResult', isLoggedIn, studentsController.saveResult);

    //save result to student Schema
    app.post('/saveResultToStuSchema', isLoggedIn, studentsController.saveResultToStuSchema);
    //route to get student Profile data
    app.get('/getStudentProfile',isLoggedIn,studentsController.getStudentProfile);

    //route to update student Profile
    app.post('/updateStudentProfile',isLoggedIn,studentsController.updateStudentProfile);

    //route to get test Details on testpage
    app.get('/getTestDetails',isLoggedIn,studentsController.getTestDetails);

    //router to update AttemptedBy in tests schema
    app.post('/testAttemptedBy',isLoggedIn,studentsController.testAttemptedBy);

    //get results from student schema
    app.get('/getResults',isLoggedIn,studentsController.getResults);

};
