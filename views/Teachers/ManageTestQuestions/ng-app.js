const app = angular.module("manageTestQuestionsApp", ['ngMessages']);

app.controller("manageTestQuestionsAppCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (testID, queNos, testName) {
        $scope.errorMessages = [];
        console.log(testID, queNos);
        $scope.data = {};
        $scope.data.TestID = testID;
        $scope.data.NumberOfQuestions = queNos;
        $scope.data.TestName = testName;
        $scope.data.Questions = new Array(queNos);
        $scope.data.Questions.Options = new Array(4);

    };

    //Method To Create Test
    $scope.createTest = function () {
        alertify.confirm("Do You really want to create test?", function () {
            $http.post("/manageTestQuestions/createQuestions", $scope.data).then(function (resposne) {
                if (resposne.status === 500) {
                    alertify.error("Something Went Wrong While Creating Test");
                } else if (resposne.status === 201) {
                    alertify.alert("Test Created Successfully");
                    $window.location = "/manageTests";
                }else if(resposne.status === 200){
                    alertify.alert("Test With Same ID Already Exists")
                }
            })
        })
    };

}]);