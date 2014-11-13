/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../app.ts" />

var svgCanvas = (function () {
    function svgCanvas($rootScope, svgElement) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.svgElement = svgElement;
        this.restrict = "E";
        this.replace = true;
        this.template = '<g><rect width={{rectangleSVG.height}} height="30" style="opacity:0"></rect></g>';
        this.link = function (scope, element, attrs) {
            var selectedElement = element;
            _this.svgElement.svgroot = selectedElement;
            var x = element[0].offsetLeft;
            var y = element[0].offsetTop;

            _this.svgElement.setOffsetsForCanvas(x, y);
            _this.svgElement.setStrokeColor(scope.myColor);
            _this.svgElement.setStrokeWidth(scope.myStroke);

            selectedElement.on('mousedown', function (event) {
                _this.svgElement.mouseDown(event);
            });
            selectedElement.on('mouseup', function (event) {
                _this.svgElement.mouseUp(event);
            });
            selectedElement.on('mousemove', function (event) {
                _this.svgElement.mouseMove(event);
            });
        };
    }
    svgCanvas.directiveId = "svgCanvas";
    return svgCanvas;
})();

// Update the app1 variable name to be that of your module variable
app.directive(svgCanvas.directiveId, [
    '$rootScope', 'svgElement', function ($rootScope, svgElement) {
        return new svgCanvas($rootScope, svgElement);
    }
]);
//# sourceMappingURL=svgCanvas.js.map
