/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var penTool = (function () {
    function penTool($http, $resource) {
        this.$http = $http;
        this.$resource = $resource;
    }
    penTool.serviceId = "penTool";
    return penTool;
})();

// Update the app1 variable name to be that of your module variable
app.factory(penTool.serviceId, [
    '$http', '$resource', function ($http, $resource) {
        return new penTool($http, $resource);
    }
]);
//# sourceMappingURL=penTool.js.map
