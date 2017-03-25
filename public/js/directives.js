var jqueryDirectives = angular.module("jqueryDirectives", []);

jqueryDirectives.directive("toolTip", function () {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            $(element).tooltip();
        }
    };
});