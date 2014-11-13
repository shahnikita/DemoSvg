/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var svgCanvas = (function () {
    // template: string = '<svg ng-attr-height={{canvas.height}} ng-attr-width={{canvas.width}}></svg>';
    function svgCanvas($rootScope, $compile, svgCanvasService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.svgCanvasService = svgCanvasService;
        this.restrict = "AE";
        this.replace = false;
        this.link = function (scope, element, attrs) {
            var createdelement = null;
            element.on('mousedown', function (event) {
                _this.svgCanvasService.svgroot = element;
                var x = element.offset().left;
                var y = element.offset().top;

                //var x = element[0].offsetParent.clientHeight;
                //var y = element[0].offsetParent.clientWidth;
                _this.svgCanvasService.setOffsetsForCanvas(x, y);

                // console.log(scope.myColor);
                _this.svgCanvasService.setStrokeColor(scope.myColor);
                _this.svgCanvasService.setStrokeWidth(scope.myStroke);
                createdelement = _this.svgCanvasService.mouseDown(event);
            });
            element.on('mouseup', function (event) {
                _this.svgCanvasService.mouseUp(event);
            });
            element.on('mousemove', function (event) {
                _this.svgCanvasService.mouseMove(event);
            });
        };
    }
    svgCanvas.directiveId = "svgCanvas";
    return svgCanvas;
})();

// Update the app1 variable name to be that of your module variable
app.directive(svgCanvas.directiveId, [
    '$rootScope', '$compile', 'svgCanvasService', function ($rootScope, $compile, svgCanvasService) {
        return new svgCanvas($rootScope, $compile, svgCanvasService);
    }
]);
//# sourceMappingURL=svgCanvas.js.map
