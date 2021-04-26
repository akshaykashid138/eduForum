const app = angular.module("manageStudents", ['ngMessages']);

app.controller("manageStudentsCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];
        $scope.getAllStudents();


    };

    $scope.getAllStudents =function () {
        $http.get('/getAllStudents').then(function (response) {

            $scope.data = response.data;
        })
    }

    //Method to disable student
    $scope.disableStudent = function (UserID) {
        $scope.Details={};
        $scope.Details.UserID=UserID;

        $http.post('/disableStudent',$scope.Details).then(function (response) {

            if(response.status===500){
                alertify.alert("Something Went Wrong While Disabling Student");
            }
            else if (response.status === 201) {
                alertify.alert("Student Disabled Successfully");
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }
            $scope.initController();
        });


    };

    //Method to Enable student
    $scope.enableStudent = function (UserID) {
        $scope.Details={};
        $scope.Details.UserID=UserID;
        $http.post('/enableStudent',$scope.Details).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While Enabling Student");
            }
            else if (response.status === 201) {

                alertify.alert("Student Enabled Successfully");
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }
            $scope.initController();
        })


    }

}]);