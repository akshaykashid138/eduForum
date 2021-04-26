const app = angular.module("activityLog", ['ngMessages']);

app.controller("activityLogCtrlr", ["$scope", "$window", "$http", function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.UserID = UserID;
        $http.get('/getSelfAskedQuestions?UserID=' + $scope.UserID).then(function (response) {
            $scope.questions = response.data;
            console.log($scope.questions)
        })

    };
}]);