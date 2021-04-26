const app = angular.module("studentRegistrationApp", ['ngMessages']);

app.controller("studentRegistrationAppCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];

    };

    $scope.initController();

    //Method To Register User
    $scope.registerStudent = function () {
        console.log($scope.data);
        $scope.data.UserTypeID=3;
        $scope.data.IsVerified = true;
        $scope.errorMessages = [];
        $http.post('/registerStudent', $scope.data).then(function (response) {
            if (response.status === 500) {
                alertify.alert("Something Went Wrong While Registrating Student")
            } else if (response.status === 201) {
                alertify.alert("Student Registered Successfully", function () {
                    $window.location = '/login';
                })
            } else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }
        })
    };

}])
