const app = angular.module("askQuestionApp", ['ngMessages','ngTagsInput','ngCkeditor']);

app.controller("askQuestionAppCtrlr",["$scope","$window", "$http",function ($scope, $window, $http) {
    //CKEditor Options Configuration
    $scope.editorOptions = {
        toolbar: [
            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },

            {
                name: 'forms',
                items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
            },
            {
                name: 'basicstyles',
                items: [ 'Font','FontSize','Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
            },
            {
                name: 'paragraph',
                items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
            },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            {
                name: 'insert',
                items: ['Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
            },
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
        ],
        height: '380px'
    };

    //Method To Initialize Controller
    $scope.initController = function (UserID,FullName,UserTypeID) {
        $scope.errorMessages = [];
        $scope.data={};

        $scope.data.CreatedBy=UserID;
        $scope.data.CreatorName =FullName;
        $scope.data.CreatorType=UserTypeID;
        
    };



    //Method to Save Question
    $scope.askQuestion =function () {
        console.log($scope.data);
        $scope.data.CreatedDate=Date.now();
        $scope.data.Views = [];
        $scope.errorMessages = [];


        $http.post('/askQuestion',$scope.data).then(function (response) {
            if(response.status===500){
                alertify.alert("Something Went Wrong While posting Question");
            }
            else if (response.status === 201) {
                alertify.alert("Question Posted Successfully", function () {
                    $window.location = response.data.url;
                })
            }
            else if (response.status === 200) {
                $scope.errorMessages = response.data.message;
                alertify.alert("Please Check Validation Errors");
            }

        })

    }

}]);