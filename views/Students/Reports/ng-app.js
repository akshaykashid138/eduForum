const app = angular.module("viewTests", ['ngMessages']);

app.controller("viewTestsCtrlr", ["$scope", "$window", "$http", function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.UserID = UserID;

        $http.get('/getResults?UserID=' + $scope.UserID).then(function (response) {
            console.log(response.data);
            $scope.Results = response.data;
            $scope.TestResult = ($scope.Results[0].TestResult).slice();

        });
        $scope.getStudentRewardsPoints();
    };

    $scope.getStudentRewardsPoints = function () {
        $http.get('/getStudentRewardsPoints?UserID=' + $scope.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        })
    }
}]);