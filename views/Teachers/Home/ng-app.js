const app = angular.module("teacherHome", ['ngMessages']);

app.controller("teacherHomeCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.UserID = UserID
        $http.get('/getRecentlyAskedQuestions').then(function (response) {
            $scope.questions = response.data;
        })
        $scope.getTeacherRewardsPoints();
    };
    $scope.getTeacherRewardsPoints = function () {
        $http.get('/getTeacherRewardsPoints?UserID=' + $scope.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        });
    };


    //Method to Save Question
    $scope.askQuestion =function () {
        console.log($scope.data);
        $scope.errorMessages = [];
        $http.post('/askQuestion',$scope.data).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While posting Question");
            }
            else if (response.status === 201) {
                alertify.alert("Question Posted Successfully", function () {
                    $window.location = response.data.url;
                })
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }

        })

    }

}]);