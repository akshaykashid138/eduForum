const studentRegistrationController = require('../controllers/studentRegistration.controller');

module.exports = function (app) {
    //method to render Student Registration Page
    app.get('/signup',studentRegistrationController.renderStudentRegistrationPage);

    //methods to Register New Student
    app.post('/registerStudent',studentRegistrationController.registerNewStudent)

};

