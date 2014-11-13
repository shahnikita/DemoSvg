/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var myTextBox = (function () {
    //  template: string = '<foreignObject><p xmlns = "http://www.w3.org/1999/xhtml"> Text goes here </p></foreignObject>';
    function myTextBox(svgCanvasService, $compile, $document, $log) {
        var _this = this;
        this.svgCanvasService = svgCanvasService;
        this.$compile = $compile;
        this.$document = $document;
        this.$log = $log;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            var requireElement = element.parent();

            var a = _this.svgCanvasService.addSvgElementFromJson({
                "element": "foreignObject",
                "Attr": {
                    "x": parseInt(element.attr("x")) + 10,
                    "y": parseInt(element.attr("y")) + 10,
                    "width": parseInt(element.attr("width")) - 30,
                    "height": parseInt(element.attr("height")) - 30
                }
            }, requireElement);
            angular.element(a).append('<textarea style="width:100%;height:100%;"></textarea >');
            var contentData = "";
            angular.element(angular.element(a).children("textarea")).on('input', function (event) {
                var sendObject = {};
                var currentElement = angular.element(event.currentTarget);
                var currentElementValue = angular.element(event.currentTarget).val();
                var abc = diff_match_patch.prototype.diff_main(contentData, currentElementValue);

                var diffValue = diff_match_patch.prototype.diff_lineMode_(contentData, currentElementValue);

                _this.$log.debug(diffValue);
                var pos = 0;
                for (var i = 0; i < diffValue.length; i++) {
                    if (diffValue[i][0] != 0) {
                        sendObject = {
                            text: diffValue[i][1],
                            pos: pos,
                            op: diffValue[i][0]
                        };
                    } else {
                        pos = pos + diffValue[i][1].length;
                    }
                }
                _this.$log.info(sendObject);
                contentData = currentElementValue;
            });

            angular.element(a).on('mousedown', function (event) {
                event.stopPropagation();
            });
            angular.element(a).on('mouseup', function (event) {
                event.stopPropagation();
            });
            angular.element(a).on('mousemove', function (event) {
                event.stopPropagation();
            });

            angular.element(a).on("keyup", function (event) {
                var value = String.fromCharCode(event.keyCode);
            });
        };
    }
    myTextBox.directiveId = "myTextBox";
    return myTextBox;
})();

// Update the app1 variable name to be that of your module variable
app.directive(myTextBox.directiveId, [
    'svgCanvasService', '$compile', '$document', '$log', function (svgCanvasService, $compile, $document, $log) {
        return new myTextBox(svgCanvasService, $compile, $document, $log);
    }
]);
//# sourceMappingURL=myTextBox.js.map
