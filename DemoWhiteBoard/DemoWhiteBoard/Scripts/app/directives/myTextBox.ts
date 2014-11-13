/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file
declare function diff_match_patch(): any;
interface ImyTextBox extends ng.IDirective {

}

interface ImyTextBoxScope extends ng.IScope {

}

class myTextBox implements ImyTextBox {
    static directiveId: string = "myTextBox";
    restrict: string = "A";
    //  template: string = '<foreignObject><p xmlns = "http://www.w3.org/1999/xhtml"> Text goes here </p></foreignObject>';

    constructor(private svgCanvasService, private $compile, private $document, private $log) {

    }

    link = (scope: ImyTextBoxScope, element, attrs) => {

        var requireElement = element.parent();

        var a = this.svgCanvasService.addSvgElementFromJson({
            "element": "foreignObject",
            "Attr": {
                "x": parseInt(element.attr("x")) + 10,
                "y": parseInt(element.attr("y")) + 10,
                "width": parseInt(element.attr("width")) - 30,
                "height": parseInt(element.attr("height")) - 30,
            }
        }, requireElement);
        angular.element(a).append('<textarea style="width:100%;height:100%;"></textarea >');
        var contentData = "";
        angular.element(angular.element(a).children("textarea")).on('input', (event) => {
            var sendObject = {};
            var currentElement = angular.element(event.currentTarget);
            var currentElementValue = angular.element(event.currentTarget).val();
            var abc = diff_match_patch.prototype.diff_main(contentData, currentElementValue);

            var diffValue = diff_match_patch.prototype.diff_lineMode_(contentData, currentElementValue);

            this.$log.debug(diffValue);
            var pos = 0;
            for (var i = 0; i < diffValue.length; i++) {

                if (diffValue[i][0] != 0) {
                    sendObject = {
                        text: diffValue[i][1],
                        pos: pos,
                        op: diffValue[i][0],
                    }

                }
                else {
                    pos = pos + diffValue[i][1].length;
                }
            }
            this.$log.info(sendObject);
            contentData = currentElementValue;

        });


        angular.element(a).on('mousedown', (event) => {
            event.stopPropagation();
        });
        angular.element(a).on('mouseup', (event) => {

            event.stopPropagation();
        });
        angular.element(a).on('mousemove', (event) => {

            event.stopPropagation();
        });

        angular.element(a).on("keyup", function (event) {
            var value = String.fromCharCode(event.keyCode);
        });
    }
}

// Update the app1 variable name to be that of your module variable
app.directive(myTextBox.directiveId, ['svgCanvasService', '$compile', '$document', '$log', (svgCanvasService, $compile, $document, $log) =>
    new myTextBox(svgCanvasService, $compile, $document, $log)
]);
