const adminController = require('../controllers/admin.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports =function (app) {
    app.get('/adminHome',isLoggedIn,adminController.renderAdminHomePage);

    app.get('/manageStudents',isLoggedIn,adminController.renderManageStudentsPage);

    app.get('/manageTeachers',isLoggedIn,adminController.renderManageTeachersPage);

    app.get('/getAllStudents',isLoggedIn,adminController.getAllStudents);

    app.get('/getAllTeachers',isLoggedIn,adminController.getAllTeachers);

    app.get('/approveTeachers',isLoggedIn,adminController.renderApproveTeachersPage);

    app.get('/getTeachers',isLoggedIn,adminController.getTeachers);

    app.post('/disableStudent',isLoggedIn,adminController.disableStudent);

    app.post('/enableStudent',isLoggedIn,adminController.enableStudent);

    app.post('/disableTeacher',isLoggedIn,adminController.disableTeacher);

    app.post('/enableTeacher',isLoggedIn,adminController.enableTeacher);
};