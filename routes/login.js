const userLoginController = require('../controllers/login.controller');

module.exports = function (app) {
    //Method render Login Page
    app.get('/login', userLoginController.renderloginPage);

    //Method to Log in
    app.post('/login', userLoginController.userLogin);

    app.get('/logout', userLoginController.logoutRoute);



};