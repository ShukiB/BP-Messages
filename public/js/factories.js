var factoriesMod = angular.module("factoriesMod", []);

factoriesMod.factory("commentsFactory", function($http, $q) {
    return {
        getComments: function () {
            var def = $q.defer();

            var params = {
                method: "GET",
                url: window.location.href + "comments"
            };

            $http(params).then(function (result){
                def.resolve(result.data);
            },
            function() {
                def.reject();
            });

            return def.promise;
        },
        editComment: function(commentText, commentId) {
            var def = $q.defer();

            var params = {
                method: "PUT",
                url: window.location.href + "comments/" + commentId,
                data: { "comment" : commentText }
            };

            $http(params).then(function (result){
                def.resolve(result);
            },
            function(error) {
                def.reject(error);
            });

            return def.promise;
        },
        deleteComment: function(comment) {
            var def = $q.defer();

            var params = {
                method: "DELETE",
                url: window.location.href + "comments/" + comment.id
            };

            $http(params).then(function (result){
                def.resolve(result);
            },
            function(error) {
                def.reject(error);
            });

            return def.promise;
        }
    }
});