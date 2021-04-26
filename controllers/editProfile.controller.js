
var userSchema = require('../models/user.Schema');

//Method To Render Edit Profile Page
exports.renderEditProfile = function (req, res) {
    res.render("EditProfile/editProfile");
};

