const indexController = require('../controllers/index.controller');


module.exports = function (app) {
    //Method To Render Home Page
    app.get('/', indexController.renderHomePage);
    app.get('/forgotPassword',indexController.renderForgotPasswordPage);
    app.get('/getPassword',indexController.getPassword);



};