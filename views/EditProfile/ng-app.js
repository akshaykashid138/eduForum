const app = angular.module("editProfile", ['ngMessages', 'ngFileUpload']);

app.controller("editProfileCtrlr", ["$scope", "$window", "$http", "$parse", function ($scope, $window, $http) {

    //Method To Initialize Controller
    $scope.initController = function (UserID, FullName, UserTypeID, EmailID) {
        $scope.errorMessages = [];
        $scope.data = {};
        $scope.data.UserID = UserID;
        $scope.data.EmailID = EmailID;
        $scope.data.FullName = FullName;
        $scope.data.UserTypeID = UserTypeID;


        if ($scope.data.UserTypeID == 3) {
            $http.get('/getStudentProfile?UserID=' + $scope.data.UserID).then(function (response) {
                $scope.temp = response.data;
                $scope.PersonalData = $scope.temp[0].PersonalData[0];
                console.log($scope.PersonalData)

            })
        }

        if ($scope.data.UserTypeID == 2) {
            $http.get('/getTeacherProfile?UserID=' + $scope.data.UserID).then(function (response) {
                $scope.temp = response.data;
                $scope.PersonalData = $scope.temp[0].PersonalData[0];
                console.log($scope.PersonalData)

            })
        }

    };

    $scope.Update = function () {
        console.log($scope.PersonalData);
        if ($scope.data.UserTypeID == 3) {
            $http.post('/updateStudentProfile', $scope.PersonalData).then(function (response) {
                if (response.status === 500) {
                    alertify.alert("Something Went Wrong While Updating Profile");
                }
                else if (response.status === 201) {
                    alertify.alert("Profile Updated Successfully");
                }
                else if (response.status === 200) {
                    $scope.errorMessages = response.data.message;
                    alertify.alert("Please Check Validation Errors");
                }

            })

        }

        if ($scope.data.UserTypeID == 2) {
            $http.post('/updateTeacherProfile', $scope.PersonalData).then(function (response) {
                if (response.status === 500) {
                    alertify.alert("Something Went Wrong While Updating Profile");
                }
                else if (response.status === 201) {
                    alertify.alert("Profile Updated Successfully");
                }
                else if (response.status === 200) {
                    $scope.errorMessages = response.data.message;
                    alertify.alert("Please Check Validation Errors");
                }

            })
        }


    };


}]);


// app.controller('MyCtrl',['Upload','$window',function(Upload,$window){
//     var vm = this;
//     vm.submit = function(){ //function to call on form submit
//         if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
//             vm.upload(vm.file); //call upload function
//         }
//     }
//
//     vm.upload = function (file) {
//         Upload.upload({
//             url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
//             data:{file:file} //pass file as data, should be user ng-model
//         }).then(function (resp) { //upload function returns a promise
//             if(resp.data.error_code === 0){ //validate success
//                 $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
//             } else {
//                 $window.alert('an error occured');
//             }
//         }, function (resp) { //catch error
//             console.log('Error status: ' + resp.status);
//             $window.alert('Error status: ' + resp.status);
//         }, function (evt) {
//             console.log(evt);
//             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//             console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//             vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
//         });
//     };
// }]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file,UserID,UserTypeID, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('UserID',UserID);
        fd.append('UserTypeID',UserTypeID);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (response) {
           if(response.status === 500)
               alertify.alert("Something Went Wrong While Updating Profile Photo");
           else if(201){
               alertify.alert("Profile photo updated successfully");
           }


        })
            // .success(function () {
            // })
            //
            // .error(function () {
            // });

    }

}]);

app.controller('myCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {
    $scope.uploadFile = function () {
        var file = $scope.myFile;
        var UserID = $scope.data.UserID;
        var UserTypeID = $scope.data.UserTypeID;
        var uploadUrl = "/savedata";
        fileUpload.uploadFileToUrl(file,UserID,UserTypeID, uploadUrl);
    }
}]);