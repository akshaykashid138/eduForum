const activityLogController = require('../controllers/activityLog.controller');
var isLoggedIn = require('../lib/isLoggedIn');

module.exports = function (app) {
    app.get('/activityLog',isLoggedIn, activityLogController.renderActivityLog);
    app.get('/getSelfAskedQuestions', activityLogController.getSelfAskedQuestions);
};

