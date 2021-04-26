var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
const dotenv=require('dotenv')
const cors =require("cors")
dotenv.config()
var PORT=process.env.PORT || 4000;


var nodemailer = require("nodemailer");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session Configuration
app.use(session({
    secret: "Session Secret Key",
    resave: false,
    saveUninitialized: true
}));

//Global Variables For Views
app.use(function (req, res, next) {

    res.locals.EmailID = req.session.EmailID;
    res.locals.menuItems = req.session.menuItems;
    res.locals.UserTypeID = req.session.UserTypeID;
    res.locals.UserID = req.session.UserID;
    res.locals.FullName = req.session.FullName;
    next();

});


//Database Connection
let MONGO_URL=process.env.MONGO_URL
mongoose.connect(MONGO_URL, function (err) {
    if (err)
        throw err;
    else
        console.log("Connected Successfully");
});



// Routes Imported Here
require('./routes/index')(app);
require('./routes/studentRegistration')(app);
require('./routes/login')(app);
require('./routes/teacherRegistration')(app);
require('./routes/students')(app);
require('./routes/teachers')(app);
require('./routes/askQuestions')(app);
require('./routes/viewQuestion')(app);
require('./routes/submitAnswer')(app);
require('./routes/getQuestionDetails')(app);
require('./routes/admin')(app);
require('./routes/editProfile')(app);
require('./routes/fileUploader')(app);
require('./routes/rewardsPoints')(app);
require('./routes/viewProfile')(app);
require('./routes/activityLog')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT,function(){
    console.log();
})
module.exports = app;
