const app = angular.module("adminHome", ['ngMessages']);

app.controller("adminHomeCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function () {
        $scope.errorMessages = [];
        $http.get('/getRecentlyAskedQuestions').then(function (response) {
            $scope.questions = response.data;
        })
    };


    //View Question
    // $scope.viewQuestion =function (QuestionID) {
    //    $http.get('/viewQuestion?Q='+QuestionID).then(function () {
    //
    //
    //    })
        //console.log(QuestionID);
        // $http({
        //     url: '/viewQuestion',
        //     method: "GET",
        //     params: {Q: QuestionID}
        // });

    // }

}]);