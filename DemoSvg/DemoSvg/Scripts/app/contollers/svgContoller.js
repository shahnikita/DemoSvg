/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />
// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file

var svgContoller = (function () {
    function svgContoller($scope, svgElement) {
        var _this = this;
        this.$scope = $scope;
        this.svgElement = svgElement;
        //default
        $scope.colorPalette = ["#1111F3", "#06F406", "#F48703", "#FF3200", "#F4F40B", "#FFFFFF", "#000000"];
        $scope.strokePalette = [1, 2, 3, 4, 5, 7, 10];
        $scope.canvas = {
            height: '500',
            width: '500'
        };
        $scope.rectangleSVG = {
            height: $scope.canvas.height,
            width: $scope.canvas.width,
            x: 0,
            y: 0
        };

        $scope.pathToolClick = function () {
            return _this.pathToolClick();
        };
        $scope.strokeEraserClick = function () {
            return _this.strokeEraserClick();
        };
        $scope.freeEraserClick = function () {
            return _this.freeEraserClick();
        };
        $scope.setStrokeColorChange = function (val) {
            return _this.setStrokeColor(val);
        };
        $scope.setStrokeWidthChange = function (val) {
            return _this.setStrokeWidth(val);
        };
    }
    svgContoller.prototype.pathToolClick = function () {
        this.svgElement.setMode("path");
    };
    svgContoller.prototype.strokeEraserClick = function () {
        this.svgElement.setMode("strokeEraser");
    };
    svgContoller.prototype.freeEraserClick = function () {
        this.svgElement.setMode("freeEraser");
    };
    svgContoller.prototype.setStrokeColor = function (val) {
        this.svgElement.setStrokeColor(val);
    };
    svgContoller.prototype.setStrokeWidth = function (val) {
        this.svgElement.setStrokeWidth(val);
    };
    svgContoller.controllerId = "svgContoller";
    return svgContoller;
})();

// Update the app1 variable name to be that of your module variable
app.controller(svgContoller.controllerId, [
    '$scope', 'svgElement', function ($scope, svgElement) {
        return new svgContoller($scope, svgElement);
    }
]);
//# sourceMappingURL=svgContoller.js.map
