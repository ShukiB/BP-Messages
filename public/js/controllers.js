var controllersMod = angular.module("controllersMod", []);

controllersMod.controller("commentsCtrl", function($scope, $uibModal, commentsFactory) {
    $scope.comments = [];
    $scope.laodError = false;

    $scope.getComments = function() {
        commentsFactory.getComments().then(function(data) {
            $scope.comments = data;

            // Setting tooltip for the entire page
            // This is being set here since we request the comments after each action
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();
            });
        },
        function(error) {
            $scope.laodError = true;
        });
    }

    $scope.editComment = function(comment) {
        // Instanciating a new modal window
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../modals/editModal.html',
            size: 'sm',
            controller: function($scope, $uibModalInstance, comment) {
                $scope.editedCommentText = comment.comment;
                $scope.editedCommentId = comment.id;

                $scope.save = function() {
                    commentsFactory.editComment($scope.editedCommentText, $scope.editedCommentId).then(function(result) {
                        $uibModalInstance.close(result);
                    },
                    function (error) {
                        $uibModalInstance.close(error);
                    });
                }

                $scope.cancel = function() {
                    $uibModalInstance.dismiss();
                }
            },
            resolve: {
                comment: function() {
                    return comment;
                }
            }
        });

        modalInstance.result.then(function(result) {
            // OK
            if (result.status === 200) { 
                // Updating the comment
                angular.copy(result.data, comment);
            }
        }, function () {
            // This is just a fallback for rejection of the modal
            console.log("Modal was dismissed at: " + new Date());
        });
    }

    $scope.deleteComment = function(comment) {
        // Instanciating a new modal window
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            templateUrl: '../modals/deleteModal.html',
            size: 'sm',
            controller: function($scope, $uibModalInstance, comment) {
                $scope.delete = function() {
                    commentsFactory.deleteComment(comment).then(function(result) {
                        $uibModalInstance.close(result);
                    },
                    function (error) {
                        $uibModalInstance.close(error);
                    });
                }

                $scope.cancel = function() {
                    $uibModalInstance.dismiss();
                }
            },
            resolve: {
                comment: function() {
                    return comment;
                }
            }
        });

        modalInstance.result.then(function(result) {
            // OK
            if (result.status === 200) { 
                // Removing the deleted comment from the array by its id
                var commentIndex = _findObjLocIndex($scope.comments, comment, "id");
                if (!isNaN(commentIndex)) {
                    $scope.comments.splice(commentIndex, 1);
                }
            }
        }, function () {
            // This is just a fallback for rejection of the modal
            console.log("Modal was dismissed at: " + new Date());
        });
    }

    // Getting the comments from the service
    $scope.getComments();

    var _findObjLocIndex = function(array, obj, prop) {
        if (array.constructor === Array && obj.constructor === Object && prop.constructor === String) {
            if (!obj[prop]) return undefined; // so we won't compare undefined with undefined

            for(var i = 0; i < array.length; i++) {
                if (array[i][prop] === obj[prop]) {
                    return i;
                }
            }
        }
        // In case we didn't find the obj index for any reason
        return undefined;
    }
});
