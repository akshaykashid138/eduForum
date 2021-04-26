const app = angular.module("viewTests", ['ngMessages']);

app.controller("viewTestsCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.UserID = UserID;
        $http.get('/getAllTests?UserID='+$scope.UserID).then(function (response) {
            $scope.tests = response.data;
            console.log($scope.tests)
        })
        $scope.getStudentRewardsPoints();
    };

    $scope.getStudentRewardsPoints = function () {
        $http.get('/getStudentRewardsPoints?UserID='+$scope.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        })

    }




}]);