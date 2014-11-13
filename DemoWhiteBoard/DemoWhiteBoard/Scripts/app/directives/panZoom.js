/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var panZoom = (function () {
    function panZoom($window) {
        this.$window = $window;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            //Here the value of attribute comes in string so we have to convert it into boolean and pass it.
            //if the attibute is not passed then it will take default value.
            scope.Panning = false; // as this will be always false and will be true on panEnable
            scope.Zooming = (attrs.zoomEnabled == "false" ? false : true);

            scope.panBtnVisible = scope.Panning;

            //We can set property to the svgPanZoom
            var panZoom = svgPanZoom(element[0], {
                zoomEnabled: scope.Zooming,
                panEnabled: scope.Panning,
                minZoom: 0,
                maxZoom: 10,
                zoomScaleSensitivity: 0.075
            });

            scope.chkZoomEnabled = panZoom.isZoomEnabled(); //tentative will change as per document mode,just checking condition here for future use
            if (scope.chkZoomEnabled) {
                //this function will invoke the zoomIn method of svg-pan-zoom library
                scope.zoomIn = function () {
                    panZoom.zoomIn();
                    scope.panBtnVisible = true;
                };

                //this function will invoke the zoomOut method of svg-pan-zoom library
                scope.zoomOut = function () {
                    panZoom.zoomOut();
                    scope.panBtnVisible = true;
                };

                //this function will invoke the enablePan method of svg-pan-zoom library
                scope.panEnable = function () {
                    panZoom.enablePan();
                };
            }
        };
    }
    panZoom.directiveId = "panZoom";
    return panZoom;
})();

// Update the app variable name to be that of your module variable
app.directive(panZoom.directiveId, [
    '$window', function ($window) {
        return new panZoom($window);
    }
]);
//# sourceMappingURL=panZoom.js.map
