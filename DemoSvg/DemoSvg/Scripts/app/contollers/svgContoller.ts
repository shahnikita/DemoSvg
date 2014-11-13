/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />
// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IsvgContollerScope extends ng.IScope {
    canvas: {
        height: string;
        width: string;
    };
    rectangleSVG: {
        x: number;
        y: number;
        height: string;
        width: string;
    };
    defaultStroke: {
        color: string;
        width: string;
        fill: string;
    };
    current_draw_element: string;
    colorPalette: Array<string>;
    strokePalette: Array<number>;
    pathToolClick: () => void;
    strokeEraserClick: () => void;
    freeEraserClick: () => void;
    setStrokeColorChange: (val) => void;
    setStrokeWidthChange: (val) => void;

}

interface IsvgContoller {
   
}

class svgContoller implements IsvgContoller {
    static controllerId: string = "svgContoller";
    
    constructor(private $scope: IsvgContollerScope,private svgElement) {
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
            x:0,
            y:0
        }

        $scope.pathToolClick=()=> this.pathToolClick();
        $scope.strokeEraserClick = () => this.strokeEraserClick();
        $scope.freeEraserClick = () => this.freeEraserClick();
        $scope.setStrokeColorChange = (val) => this.setStrokeColor(val);
        $scope.setStrokeWidthChange = (val) => this.setStrokeWidth(val);
    }


    private pathToolClick() {
        this.svgElement.setMode("path");
    }
    private strokeEraserClick() {
        this.svgElement.setMode("strokeEraser");
    }
    private freeEraserClick() {
        this.svgElement.setMode("freeEraser");
    }
    private setStrokeColor(val) {
        this.svgElement.setStrokeColor(val);
    }
    private setStrokeWidth(val) {
        this.svgElement.setStrokeWidth(val);
    }
}

// Update the app1 variable name to be that of your module variable
app.controller(svgContoller.controllerId, ['$scope', 'svgElement', ($scope, svgElement) =>
    new svgContoller($scope, svgElement)
]);
