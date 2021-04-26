const app = angular.module("manageTests", ['ngMessages']);

app.controller("manageTestsCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.UserID = UserID;
        $scope.getTests();
        $scope.getTeacherRewardsPoints();
    };

    $scope.getTeacherRewardsPoints = function () {
        $http.get('/getTeacherRewardsPoints?UserID=' + $scope.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        });
    }

    $scope.getTests = function () {
        $http.get('/getTests?UserID=' + $scope.UserID).then(function (response) {
            $scope.tests = response.data;
            console.log($scope.tests)
        })
    };

    //Method to delete test
    $scope.DeleteTest = function (TestID) {
        var testID = TestID;
        $http.get('/deleteTest?TestID='+testID).then(function (response) {
            if(response.status === 500)
            {
                alertify.error("Something Went Wrong While Deleting Test");
            }
            else if (response.status === 201) {
                alertify.alert("Test Deleted Successfully");

            }
            $scope.getTests();
        })


    }





}]);