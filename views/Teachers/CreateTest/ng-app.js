const app = angular.module("createTestApp", ['ngMessages']);

app.controller("createTestAppCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {
    //Method To Initialize Controller
    $scope.initController = function (UserID) {
        $scope.errorMessages = [];
        $scope.data={};
        $scope.data.CreatedBy = UserID;
        $scope.UserID = UserID;
        $scope.getTeacherRewardsPoints();
    };

    $scope.getTeacherRewardsPoints = function () {
        $http.get('/getTeacherRewardsPoints?UserID=' + $scope.UserID).then(function (response) {

            $scope.RewardsPoints = response.data.RewardsPoints;

        });
    }

    //Method to Create Test
    $scope.createTest =function () {

        $scope.data.CreatedDate=Date.now();
        $scope.errorMessages = [];

        $http.post('/createTest',$scope.data).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While Creating Test");
            }
            else if (response.status === 201) {
                alertify.alert("Test Created Successfully", function () {
                    $window.location = '/manageTestQuestions?TestID=' + response.data.TestID ;
                })
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }

        })

    }

}]);