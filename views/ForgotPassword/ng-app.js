const app = angular.module("forgotPasswordApp", ['ngMessages']);

app.controller("forgotPasswordAppCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];
        $scope.data={};
    };

    //method to get password
    $scope.getPassword =function () {

        $scope.errorMessages = [];
        $http.get('/getPassword?EmailID='+$scope.data.EmailID).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While sending Password");
            }
            else if (response.status === 201) {
                alertify.alert("Password Sent Successfully", function () {
                    $window.location = '/login';
                })
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }

        })

    }

}])