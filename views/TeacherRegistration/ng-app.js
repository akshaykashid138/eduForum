const app = angular.module("teacherRegistrationApp", ['ngMessages']);

app.controller("teacherRegistrationAppCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];

    };

    $scope.initController();

    //Method To Register User
    $scope.registerTeacher = function () {
        console.log($scope.data);
        $scope.data.UserTypeID=2;
        $scope.data.IsVerified = false;
        $scope.errorMessages = [];
        $http.post('/registerTeacher', $scope.data).then(function (response) {
            if (response.status === 500) {
                alertify.alert("Something Went Wrong While Registrating Teacher")
            } else if (response.status === 201) {
                alertify.alert("Teacher Registered Successfully", function () {
                    $window.location = '/login';
                })
            } else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }
        })
    };

}]);
