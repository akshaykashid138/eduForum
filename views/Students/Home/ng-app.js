const app = angular.module("studentHome", ['ngMessages']);

app.controller("studentHomeCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.UserID=UserID;
        $http.get('/getRecentlyAskedQuestions').then(function (response) {
            $scope.questions = response.data;
            console.log($scope.questions)
        })
        $scope.getStudentRewardsPoints();
    };



    $scope.getStudentRewardsPoints = function () {
        $http.get('/getStudentRewardsPoints?UserID='+$scope.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        })

    }

}]);