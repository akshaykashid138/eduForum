var userSchema = require('../models/user.Schema');
var studentSchema = require('../models/student.Schema');
const bcrypt = require('bcrypt')

//Method to render Student Registration Page
exports.renderloginPage = function (req, res) {
    res.render("Login/login");

};


//Method to login
exports.userLogin = function (req, res) {
    userSchema.findOne({EmailID: req.body.EmailID}, async (err, user) =>{

        if (err)
            return res.sendStatus(500);
        else if (!user)
            return res.status(200).send({message: "User Does Not Exist"});
        else if (user) {
            if (!user.IsVerified)
                return res.status(200).send({message: "Please Contact Admin, Account is not activated"});

            let isPasswordMatched = await bcrypt.compare(req.body.Password, user.Password)

            if (!isPasswordMatched)
                return res.status(200).send({message: "Invalid Password"})
            else {
                //Creating Roles And Rights Based System
                let sideMenuItems = [], sessionAllowedUrls = [];
               //let userName="";
                //If User Type Is Student
                if (user.UserTypeID === 3) {

                        // studentSchema.findOne({UserID:user.UserID},function (err,student)  {
                        //     if(err)
                        //         throw err;
                        //     else {
                        //
                        //         //var userName=student.FullName;
                        //        studentID=student.StudentID;
                        //         return studentID;
                        //         //console.log("Line no 40"+student.FullName);
                        //         //req.session.FullName = student.FullName;
                        //         //console.log("Name" + req.session.FullName);
                        //     }
                        //
                        // });

                    sideMenuItems = [
                        {class: 'fa fa-home', url: '/studentsHome', title: 'Student Home'},
                        {class: 'fas fa-fw fa-table', url: '/attemptedTest', title: 'Attempted Test'},
                        {class: 'fas fa-fw fa-table', url: '/viewTests', title: 'View Tests'},
                        {class: 'fas fa-fw fa-table', url: '/reports', title: 'Reports'},
                        {class: 'fas fa-fw fa-table', url: '/tags', title: 'Tags'}
                    ];
                    sessionAllowedUrls.push('/studentsHome');
                    sessionAllowedUrls.push('/attemptedTest');
                    sessionAllowedUrls.push('/viewTests');
                    sessionAllowedUrls.push('/reports');
                    sessionAllowedUrls.push('/tags');
                    sessionAllowedUrls.push('/askQuestion');
                    sessionAllowedUrls.push('/viewQuestion');
                    sessionAllowedUrls.push('/submitAnswer');
                    sessionAllowedUrls.push('/addComment');
                    sessionAllowedUrls.push('/getQuestionDetails');
                    sessionAllowedUrls.push('/getAllTests');
                    sessionAllowedUrls.push('/getAttemptedTests');
                    sessionAllowedUrls.push('/testPage');
                    sessionAllowedUrls.push('/getTestQuestions');
                    sessionAllowedUrls.push('/saveResult');
                    sessionAllowedUrls.push('/saveResultToStuSchema');
                    sessionAllowedUrls.push('/getResults');
                    sessionAllowedUrls.push('/editProfile');
                    sessionAllowedUrls.push('/getStudentProfile');
                    sessionAllowedUrls.push('/updateStudentProfile');
                    sessionAllowedUrls.push('/savedata');
                    sessionAllowedUrls.push('/getTestDetails');
                    sessionAllowedUrls.push('/incrementTestPoints');
                    sessionAllowedUrls.push('/incrementTeacherPoints');
                    sessionAllowedUrls.push('/decrementStudentPoints');
                    sessionAllowedUrls.push('/decrementTeacherPoints');
                    sessionAllowedUrls.push('/incrementStudentPoints');
                    sessionAllowedUrls.push('/getStudentRewardsPoints');
                    sessionAllowedUrls.push('/testAttemptedBy');
                    sessionAllowedUrls.push('/like');
                    sessionAllowedUrls.push('/unlike');
                    sessionAllowedUrls.push('/views');
                    sessionAllowedUrls.push('/ansCount');
                    sessionAllowedUrls.push('/viewProfile');
                    sessionAllowedUrls.push('/star');
                    sessionAllowedUrls.push('/unStar');
                    sessionAllowedUrls.push('/viewStudentProfile');
                    sessionAllowedUrls.push('/viewTeacherProfile');
                    sessionAllowedUrls.push('/activityLog');
                    sessionAllowedUrls.push('/getSelfAskedQuestions');

                }

                //If User Type Is Teacher
                else if (user.UserTypeID === 2) {
                    sideMenuItems = [
                        {class: 'fas fa-fw fa-table', url: '/teacherHome', title: 'Teacher Home'},
                        {class: 'fas fa-fw fa-table', url: '/createTest', title: 'Create Test'},
                        {class: 'fas fa-fw fa-table', url: '/manageTests', title: 'Manage  Tests'}
                    ];
                    sessionAllowedUrls.push('/teacherHome');
                    sessionAllowedUrls.push('/createTest');
                    sessionAllowedUrls.push('/createdTests');
                    sessionAllowedUrls.push('/askQuestion');
                    sessionAllowedUrls.push('/viewQuestion');
                    sessionAllowedUrls.push('/submitAnswer');
                    sessionAllowedUrls.push('/addComment');
                    sessionAllowedUrls.push('/getQuestionDetails');
                    sessionAllowedUrls.push('/manageTestQuestions');
                    sessionAllowedUrls.push('/manageTestQuestions/createQuestions');
                    sessionAllowedUrls.push('/manageTests');
                    sessionAllowedUrls.push('/getTests');
                    sessionAllowedUrls.push('/editProfile');
                    sessionAllowedUrls.push('/getTeacherProfile');
                    sessionAllowedUrls.push('/updateTeacherProfile');
                    sessionAllowedUrls.push('/deleteTest');
                    sessionAllowedUrls.push('/getTeacherRewardsPoints');
                    sessionAllowedUrls.push('/savedata');
                    sessionAllowedUrls.push('/like');
                    sessionAllowedUrls.push('/unlike');
                    sessionAllowedUrls.push('/viewTestReport');
                    sessionAllowedUrls.push('/views');
                    sessionAllowedUrls.push('/ansCount');
                    sessionAllowedUrls.push('/star');
                    sessionAllowedUrls.push('/unStar');
                    sessionAllowedUrls.push('/viewStudentProfile');
                    sessionAllowedUrls.push('/viewTeacherProfile');
                    sessionAllowedUrls.push('/activityLog');
                    sessionAllowedUrls.push('/getSelfAskedQuestions');
                    // return res.status(201).send({url:'/teacherHome'});

                }

                //If User Type Is Admin
                else if (user.UserTypeID === 1) {

                    sideMenuItems = [
                        {class: 'fas fa-fw fa-table', url: '/adminHome', title: 'Admin Home'},
                        {class: 'fas fa-fw fa-table', url: '/manageStudents', title: 'Manage Students'},
                        {class: 'fas fa-fw fa-table', url: '/manageTeachers', title: 'Manage  Teachers'},
                        {class: 'fas fa-fw fa-table', url: '/approveTeachers', title: 'Approve  Teachers'}

                    ];

                    sessionAllowedUrls.push('/adminHome');
                    sessionAllowedUrls.push('/manageStudents');
                    sessionAllowedUrls.push('/manageTeachers');
                    sessionAllowedUrls.push('/askQuestion');
                    sessionAllowedUrls.push('/viewQuestion');
                    sessionAllowedUrls.push('/submitAnswer');
                    sessionAllowedUrls.push('/getQuestionDetails');
                    sessionAllowedUrls.push('/createTest');
                    sessionAllowedUrls.push('/getAllStudents');
                    sessionAllowedUrls.push('/getAllTeachers');
                    sessionAllowedUrls.push('/approveTeachers');
                    sessionAllowedUrls.push('/getTeachers');
                    sessionAllowedUrls.push('/disableStudent');
                    sessionAllowedUrls.push('/enableStudent');
                    sessionAllowedUrls.push('/disableTeacher');
                    sessionAllowedUrls.push('/enableTeacher');
                    sessionAllowedUrls.push('/like');
                    sessionAllowedUrls.push('/unlike');
                    sessionAllowedUrls.push('/views');
                    sessionAllowedUrls.push('/ansCount');
                    sessionAllowedUrls.push('/star');
                    sessionAllowedUrls.push('/unStar');
                    sessionAllowedUrls.push('/viewStudentProfile');
                    sessionAllowedUrls.push('/viewTeacherProfile');
                    sessionAllowedUrls.push('/activityLog');
                    sessionAllowedUrls.push('/getSelfAskedQuestions');

                }

                //Add Session Allowed Urls From Side Menu Items
                for (let menuItem of sideMenuItems) {
                    if (menuItem.length !== undefined) {
                        for (let j = 1; j < menuItem.length; j++) {
                            sessionAllowedUrls.push(menuItem[j].url)
                        }
                    } else
                        sessionAllowedUrls.push(menuItem.url);
                }



                req.session.UserID = user.UserID;
                req.session.FullName = user.FullName;
                 req.session.EmailID = user.EmailID;
                req.session.UserTypeID = user.UserTypeID;
                console.log(req.session.UserTypeID);
                req.session.menuItems = sideMenuItems;
                req.session.sessionAllowedUrls = sessionAllowedUrls;

                return res.status(201).send({url: sessionAllowedUrls[0]});


            }
        }
    })
};

exports.logoutRoute = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};