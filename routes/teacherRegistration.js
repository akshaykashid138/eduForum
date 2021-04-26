const teacherRegistrationController = require('../controllers/teacherRegistration.controller');

module.exports = function (app) {

    //method to render Teacher Registration Page
    app.get('/teacherSignup',teacherRegistrationController.renderTeacherRegistrationPage);

    //methods to Register New Teacher
    app.post('/registerTeacher',teacherRegistrationController.registerNewTeacher)

};

