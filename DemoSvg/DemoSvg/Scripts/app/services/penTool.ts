/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IpenTool {
    
}

class penTool implements IpenTool {
    static serviceId: string = "penTool";
   

    constructor(private $http: ng.IHttpService, private $resource: ng.resource.IResourceService) {
    }

    
}

// Update the app1 variable name to be that of your module variable
app.factory(penTool.serviceId, ['$http', '$resource', ($http, $resource) =>
    new penTool($http, $resource)
]);
