const editProfileController = require('../controllers/editProfile.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    app.get('/editProfile',isLoggedIn, editProfileController.renderEditProfile);
};