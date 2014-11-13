// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file
/// <reference path="app1.ts" />
/// <reference path='/Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='/Scripts/typings/angularjs/angular-resource.d.ts'/>

var svgCanvas = (function () {
    function svgCanvas($window) {
        this.$window = $window;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            scope.greeting = "Hi!";
            scope.changeGreeting = function () {
                scope.greeting = "See ya!";
            };
        };
    }
    svgCanvas.directiveId = "svgCanvas";
    return svgCanvas;
})();

// Update the app1 variable name to be that of your module variable
app.directive(svgCanvas.directiveId, [
    '$window', function ($window) {
        return new svgCanvas($window);
    }
]);
//# sourceMappingURL=svgCanvas.js.map
