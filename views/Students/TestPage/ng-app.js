const app = angular.module("testPageApp", ['ngMessages']);

app.controller("testPageAppCtrlr", ["$scope", "$window", "$http", "$timeout", function ($scope, $window, $http, $timeout, $location, $stateParams) {

    $scope.initController = function (UserID, FullName) {
        $scope.errorMessages = [];
        $scope.data = {};
        $scope.Result = {};
        // $scope.questionDetails = {};
        $scope.UserID = UserID;
        $scope.FullName = FullName;


        var number = getUrlVars()["TestID"]; //Test ID retrived from URL is stored in number
        var name = getUrlVars()["TestName"]; //Test Name retrived from URL is stored in name
        //Method to get Questions ID from URL
        function getUrlVars() {
            var vars = {};
            var parts = $window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

        $scope.data.TestID = parseInt(number); //Copy value into Question ID
        $scope.data.TestName = name.replace("%20", " "); //Copy value into TestName
        //Method to get Test Details
        $http.get('/getTestDetails?TestID=' + $scope.data.TestID).then(function (response) {
            if (response.status === 500) {
                alertify.alert("something went wrong");
            }
            else {
                $scope.TestDetails = response.data;
                $scope.TestDetails.StuID = $scope.UserID;
            }

        });


    };

    $scope.questionArray = [];
    $scope.testQuestions = [];

    $scope._test_start = true;
    //$scope.obj = {};
    $scope.QuestionNo = 0;
    var avg;
    //$scope.noTest = false;
    $scope.startTest = function () {
        //for incrementing test rewardsPoints
        $http.post('/incrementTestPoints', $scope.TestDetails).then(function (response) {
            //collectedPints incremented successfully

        });

        //for incrementing rewardsPoints of test creator
        $http.post('/incrementTeacherPoints', $scope.TestDetails).then(function (response) {
            // teacher points incremented successfully

        });

        //for decrementing rewardsPoints if student
        $http.post('/decrementStudentPoints', $scope.TestDetails).then(function (response) {
            // student points decremented successfully

        });

        $scope.result = false;
        $scope._test_start = false;
        $scope.lastResult = false;
        $scope.test_box = true;
        $scope.info_box = false;


        //console.log("Selected Papervv:",$scope.selectedPaper);

        $http.get('/getTestQuestions?TestID=' + $scope.data.TestID).then(function (response) {
                $scope.testQuestions = (response.data).slice();
                //console.log('in get test Questions',$scope.testQuestions[0].Questions);
                $scope.questionArray = ($scope.testQuestions[0].Questions).slice();
                //console.log('questionArray',$scope.questionArray);


                if ($scope.questionArray == "") {
                    $scope.noTest = true;
                    $scope.test_box = false;
                }


                $scope.test = $scope.questionArray[$scope.QuestionNo];
                $scope.Counter = 10;
                $scope.Timeout = function () {
                    $scope.Counter--;
                    timeout = $timeout($scope.Timeout, 1000);
                    if ($scope.Counter == 0) {
                        // $timeout.cancel(timeout);
                        $scope.nextQuestion();
                    }
                }
                var timeout = $timeout($scope.Timeout, 1000);

                // $scope.countdown=3000
                // $timeout(callAtTimeout, 3000);
                // function callAtTimeout() {
                //     $scope.nextQuestion();
                // }
                console.log("$scope.test", $scope.test);

            }, function (err) {
                console.log("Something Went Wrong", err);
            }
        )
    };

    $scope.selectedOption = {};
    $scope.correct = 0;
    $scope.wrong = 0;
    $scope.unattempted = 0;
    $scope.attempted = 0;
    $scope.percentage = 0;
    $scope.result = false;

    $scope.nextQuestion = function () {
        console.log("Right Answer ", $scope.test.rightAnswer);

        if (($scope.selectedOption.option === undefined)) {
            $scope.correct;
            $scope.unattempted++;
        }

        else if ((($scope.selectedOption.option).toString()) === $scope.test.rightAnswer) {
            $scope.correct++;
            $scope.attempted++;
            console.log($scope.correct);

        }


        else {
            $scope.correct;
            $scope.wrong++;
            $scope.attempted++;
        }

        $scope.QuestionNo++;
        $scope.test = $scope.questionArray[$scope.QuestionNo];
        $scope.Counter = 10;
        $scope.Timeout = function () {
            $scope.Counter--;
            timeout = $timeout($scope.Timeout, 1000);
            if ($scope.Counter == 0) {
                // $timeout.cancel(timeout);
                $scope.nextQuestion();
            }
        }
        var timeout = $timeout($scope.Timeout, 1000);
        //console.log('seclected option Checkbox', $scope.selectedOption.option);
        //console.log('seclected option ', $scope.selectedOption.option.toString());

        $scope.selectedOption = {};
        if (($scope.QuestionNo) == $scope.questionArray.length) {
            $scope.test_box = false;
            $scope.result = true;
            $scope.results_result = true;
            console.log($scope.correct);
            avg = $scope.correct / $scope.questionArray.length * 100;
            var per = Math.round(parseInt(avg)) + "%";
            // $scope.wrong=($scope.questionArray.length)-($scope.correct);
            console.log("wrong" + $scope.wrong)
            $scope.percentage = per;
            if (avg === 100) {
                //for incrementing rewardsPoints of Student with 100%
                $http.post('/incrementStudentPoints', $scope.TestDetails).then(function (response) {
                    // Student points incremented successfully
                    alertify.alert("You Won " + $scope.TestDetails.WinningPoints + " Reward Points")
                });

                //for decrementing rewardsPoints of Teacher
                $http.post('/decrementTeacherPoints', $scope.TestDetails).then(function (response) {
                    // teacher points decremented successfully

                });

            }
            else {
                alertify.alert("You Lost " + $scope.TestDetails.JoiningPoints + " Reward Points")
            }
            $scope.Result.percentage = $scope.percentage;
            $scope.Result.UserID = $scope.UserID;
            $scope.Result.StudentName = $scope.FullName;
            //var paper = $scope.selectedPaper;

            //save result to testResult Schema
            $http.post('/saveResult', {
                TestName: $scope.data.TestName,
                TestID: $scope.data.TestID,
                Result: $scope.Result
            }).then(function (response) {

                if (response.status === 500) {
                    // alertify.alert("Something went wrong while saving result")
                }
                else if (response.status === 201) {
                    // alertify.alert("Result Saved successfully")
                }

            });

            //save result to student Schema
            $http.post('/saveResultToStuSchema', {
                UserID: $scope.UserID,
                TestName: $scope.data.TestName,
                TestID: $scope.data.TestID,
                Percentage: avg
            }).then(function (response) {

                if (response.status === 500) {
                    // alertify.alert("Something went wrong while saving result")
                }
                else if (response.status === 201) {
                    // alertify.alert("Result Saved successfully")
                }

            });

            //update attempted By in tests Schema
            $http.post('/testAttemptedBy', {
                StudentID: $scope.UserID,
                TestID: $scope.data.TestID
            }).then(function (response) {


            })


        }

    }


}]);