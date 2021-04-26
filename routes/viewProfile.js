const viewProfileController = require('../controllers/viewProfile.controller');

module.exports = function (app) {
    app.get('/viewProfile', viewProfileController.renderViewProfile);

    //view student user profile
    app.get('/viewStudentProfile', viewProfileController.viewStudentProfile);

    //view teacher user profile
    app.get('/viewTeacherProfile', viewProfileController.viewTeacherProfile);
};
