const app = angular.module("viewProfile", ['ngMessages']);

app.controller("viewProfileCtrlr", ["$scope", "$window", "$http", function ($scope, $window, $http, $location, $stateParams) {

    $scope.initController = function () {
        $scope.errorMessages = [];
        $scope.PersonalData = {};



        var UserID = getUrlVars()["UserID"]; //Test ID retrived from URL is stored in number
        var UserTypeID = getUrlVars()["UserType"]; //Test Name retrived from URL is stored in name
        //Method to get Questions ID from URL
        function getUrlVars() {
            var vars = {};
            var parts = $window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

        $scope.ProfileUserID = parseInt(UserID); //Copy UserID value into UserID
        $scope.ProfileUserTypeID = parseInt(UserTypeID); //Copy value into TestName
        //get profile data as per user type ID
        if($scope.ProfileUserTypeID == 2) //to view teacher user profile
        {
            $http.get('/viewTeacherProfile?UserID='+$scope.ProfileUserID).then(function (response) {
                if(response.status===500)
                {
                    alertify.alert("something went wrong");
                }
                else
                {
                    $scope.temp = response.data;
                    $scope.PersonalData = $scope.temp[0].PersonalData[0];
                    console.log($scope.PersonalData)
                }

            })
        }

        else if($scope.ProfileUserTypeID == 3) //to view student user profile
        {
            $http.get('/viewStudentProfile?UserID='+$scope.ProfileUserID).then(function (response) {
                if(response.status===500)
                {
                    alertify.alert("something went wrong");
                }
                else
                {
                    $scope.temp = response.data;
                    $scope.PersonalData = $scope.temp[0].PersonalData[0];
                    console.log($scope.PersonalData)
                }

            })
        }




    };

}]);