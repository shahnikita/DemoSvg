/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
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
   
    restrict: string = "E";
    replace: boolean = true;
    template: string = '<g><rect width={{rectangleSVG.height}} height="30" style="opacity:0"></rect></g>';
      
    constructor(private $rootScope, private svgElement) {

    }


    link = (scope, element, attrs) => {
        var selectedElement = element;
        this.svgElement.svgroot = selectedElement;
        var x = element[0].offsetLeft;
        var y = element[0].offsetTop;


        this.svgElement.setOffsetsForCanvas(x, y);
        this.svgElement.setStrokeColor(scope.myColor);
        this.svgElement.setStrokeWidth(scope.myStroke);

        
        selectedElement.on('mousedown', (event) => {
           
            this.svgElement.mouseDown(event);
        });
        selectedElement.on('mouseup', (event) => {
            this.svgElement.mouseUp(event);
        });
        selectedElement.on('mousemove',  (event)=> {
            this.svgElement.mouseMove(event);
        });
               
               
    }
}

// Update the app1 variable name to be that of your module variable
app.directive(svgCanvas.directiveId, ['$rootScope', 'svgElement', ($rootScope, svgElement) =>
    new svgCanvas($rootScope, svgElement)
]);
