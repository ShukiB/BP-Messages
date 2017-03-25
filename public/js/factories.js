var factoriesMod = angular.module("factoriesMod", []);

factoriesMod.factory("commentsFactory", function($http, $q) {
    return {
        getComments: function () {
            return $http({
                method: "GET",
                url: window.location.href + "comments"
            });
        },
        editComment: function(commentText, commentId) {
            return $http({
                method: "PUT",
                url: window.location.href + "comments/" + commentId,
                data: { "comment" : commentText }
            });
        },
        deleteComment: function(comment) {
            return $http({
                method: "DELETE",
                url: window.location.href + "comments/" + comment.id
            });
        }
    }
});