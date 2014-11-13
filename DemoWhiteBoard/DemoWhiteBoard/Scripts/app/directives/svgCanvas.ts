/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />


// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IsvgCanvas extends ng.IDirective {
   
}

interface IsvgCanvasScope extends ng.IScope {
   
}

class svgCanvas implements IsvgCanvas {
    static directiveId: string = "svgCanvas";
    restrict: string = "AE";
    replace: boolean = false;
   // template: string = '<svg ng-attr-height={{canvas.height}} ng-attr-width={{canvas.width}}></svg>';

    constructor(private $rootScope, private $compile, private svgCanvasService) {
       
    }

    link = (scope, element, attrs) => {
        var createdelement = null;
        element.on('mousedown', (event) => {
            this.svgCanvasService.svgroot = element;
            var x = element.offset().left ;
            var y = element.offset().top ;
         
            //var x = element[0].offsetParent.clientHeight;
            //var y = element[0].offsetParent.clientWidth;
            this.svgCanvasService.setOffsetsForCanvas(x, y);
            // console.log(scope.myColor);
            this.svgCanvasService.setStrokeColor(scope.myColor);
            this.svgCanvasService.setStrokeWidth(scope.myStroke);
           createdelement=this.svgCanvasService.mouseDown(event);
        });
        element.on('mouseup', (event) => {
            this.svgCanvasService.mouseUp(event);
        });
        element.on('mousemove', (event) => {
            this.svgCanvasService.mouseMove(event);
        });       
    }
}

// Update the app1 variable name to be that of your module variable
app.directive(svgCanvas.directiveId, ['$rootScope', '$compile','svgCanvasService', ($rootScope, $compile,svgCanvasService) =>
    new svgCanvas($rootScope, $compile, svgCanvasService)
]);
