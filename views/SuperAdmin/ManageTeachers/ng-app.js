const app = angular.module("manageTeachers", ['ngMessages']);

app.controller("manageTeachersCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];
        $http.get('/getAllTeachers').then(function (response) {
            $scope.data = response.data;
            console.log($scope.data)

        })
    };

    $scope.disableTeacher = function (UserID) {
        console.log(UserID);
        $scope.details={};
        $scope.details.UserID = UserID;

        $http.post('/disableTeacher',$scope.details).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While Disabling Teacher");
            }
            else if (response.status === 201) {

                alertify.alert("Teacher Disabled Successfully");
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }
            $scope.initController();

        })

    }

    $scope.enableTeacher = function (UserID) {
        console.log(UserID);
        $scope.details={};
        $scope.details.UserID = UserID;

        $http.post('/enableTeacher',$scope.details).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While Enabling Teacher");
            }
            else if (response.status === 201) {

                alertify.alert("Teacher Enabled Successfully");
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }
            $scope.initController();

        })

    }

}]);