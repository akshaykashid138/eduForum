const app = angular.module("viewQuestionApp", ['ngMessages', 'ngSanitize','ngCkeditor']);

app.controller("viewQuestionAppCtrlr", ["$scope", "$window", "$http", function ($scope, $window, $http, $location, $stateParams) {

    //CKEditor Options Configuration
    $scope.editorOptions = {
        toolbar: [
            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },

            {
                name: 'forms',
                items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
            },
            {
                name: 'basicstyles',
                items: [ 'Font','FontSize','Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
            },
            {
                name: 'paragraph',
                items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
            },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            {
                name: 'insert',
                items: ['Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
            },
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
        ],
        height: '380px'
    };

    $scope.initController = function (UserID,FullName,UserTypeID) {
        $scope.errorMessages = [];
        $scope.data = {};
        $scope.questionDetails = {};
        $scope.data.UserID = UserID;
        $scope.data.UserTypeID = UserTypeID;
        $scope.data.AnswererName =FullName;
        $scope.CommentData = {};

        var number = getUrlVars()["Q"]; //Question ID retrived from URL is stored in number

        //Method to get Questions ID from URL
        function getUrlVars() {
            var vars = {};
            var parts = $window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

        $scope.data.QuestionsID = parseInt(number); //Copy value into Question ID
        
        $http.post('/views',{QuestionsID :$scope.data.QuestionsID,UserID:$scope.data.UserID}).then(function () {
            
        })

        $scope.getQuestionDetails();
        // console.log($scope.data.QuestionsID);
        //Method to get Question Details

        if(UserTypeID == 2)
        {

            $scope.getTeacherRewardsPoints();
        }
        else if(UserTypeID == 3)
        {
            $scope.getStudentRewardsPoints();
        }

    };

    $scope.getTeacherRewardsPoints = function () {
        $http.get('/getTeacherRewardsPoints?UserID=' + $scope.data.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        });
    };

    $scope.getStudentRewardsPoints = function () {
        $http.get('/getStudentRewardsPoints?UserID='+$scope.data.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        })

    }


    //Method to get question details
    $scope.getQuestionDetails = function () {
        var Q = $scope.data.QuestionsID;
        console.log("in ng-app getQuestion Details" + Q);
        $http.get('/getQuestionDetails?Q=' + Q).then(function (response) {
            $scope.questionDetails = response.data;
            $scope.answerLength = ($scope.questionDetails[0].Answers).length;
            console.log("in getQuestionDetails");
            console.log($scope.questionDetails);
        })

    };


    //Method to Save Answer
    $scope.submitAnswer = function () {
        console.log($scope.data);

        $scope.data.AnsweredDate = Date.now();
        $scope.data.PostedBy = $scope.data.UserID;
        $scope.data.AnswererTypeID = $scope.data.UserTypeID;
        $scope.errorMessages = [];
        console.log($scope.data);
        $http.post('/submitAnswer', $scope.data).then(function (response) {
            if (response.status === 500) {
                alertify.alert("Something Went Wrong While posting Answer");
            }
            else if (response.status === 201) {
                alertify.alert("Answer Posted Successfully", function () {
                    //increment answers count
                    $http.post('/ansCount',{QuestionsID :$scope.data.QuestionsID}).then(function (response) {
                        
                    });
                    $window.location = response.data.url;
                })
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }

        })

    };

    //Method for up/down vote
    $scope.changeVote = function (vote, flag) {
        $scope.vote = vote === flag ? 'None' : flag;
        alert($scope.vote);
    };

    //Method to add text box
    $scope.openTextBox = function () {
        $scope.openTextBox = true;
    }
    
    //method to add comment
    $scope.addComment = function (AnswerID) {

        $scope.CommentData.AnswerID=AnswerID;
        $scope.CommentData.Comments.Commenter = $scope.data.AnswererName;
        $scope.CommentData.Comments.CommenterID = $scope.data.UserID;
        console.log($scope.CommentData);

        $http.post('/addComment',$scope.CommentData).then(function (response) {
            if (response.status === 500) {
                alertify.alert("Something Went Wrong While Commenting");
            }
            else if (response.status === 201) {
                $scope.initController();
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }

        })
    }

    //Like
    $scope.Like = function (AnswerID) {

        $http.post('/like',{UserID:parseInt($scope.data.UserID),AnswerID:AnswerID}).then(function (response) {
            if (response.status === 500) {
                alertify.alert("like Error");
            }
            else if (response.status === 201) {
                $scope.initController($scope.data.UserID,$scope.data.AnswererName);
            }
        });


    };

    //Unlike
    $scope.Unlike = function (AnswerID) {

        $http.post('/unlike',{UserID:parseInt($scope.data.UserID),AnswerID:AnswerID}).then(function (response) {
            if (response.status === 500) {
                alertify.alert("like Error");
            }
            else if (response.status === 201) {
                $scope.initController($scope.data.UserID,$scope.data.AnswererName);
            }
        })
    };

    //Star
    $scope.Star = function (QuestionsID) {

        $http.post('/star',{UserID:parseInt($scope.data.UserID),QuestionsID:QuestionsID}).then(function (response) {
            if (response.status === 500) {
                alertify.alert("Star Error");
            }
            else if (response.status === 201) {
                $scope.initController($scope.data.UserID,$scope.data.AnswererName);
            }
        });
    };

    //Unstar
    $scope.UnStar = function (QuestionsID) {

        $http.post('/unStar',{UserID:parseInt($scope.data.UserID),QuestionsID:QuestionsID}).then(function (response) {
            if (response.status === 500) {
                alertify.alert("UnStar Error");
            }
            else if (response.status === 201) {
                $scope.initController($scope.data.UserID,$scope.data.AnswererName);
            }
        })
    };


}]);