const app = angular.module("approveTeachers", ['ngMessages']);

app.controller("approveTeachersCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];
        $http.get('/getTeachers').then(function (response) {
            $scope.data = response.data;
            console.log($scope.data)
        })
    };

}]);