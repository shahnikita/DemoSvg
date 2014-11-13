/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />


// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IsvgControllerScope extends ng.IScope {
    //variables

    canvas: {
        height: string;
        width: string;
    };
    defaultStroke: {
        color: string;
        width: string;
        
    };
    current_draw_element: string;
    colorPalette: Array<string>;
    strokePalette: Array<number>;

    //paging variables
    pageCount: number;


    //functions
   
    pathToolClick: () => void;
    strokeEraserClick: () => void;
    freeEraserClick: () => void;
    undoClick: () => void;
    redoClick: () => void;   


}

interface IsvgController {
    
}

class svgController implements IsvgController {
    static controllerId: string = "svgController";
    
    constructor(private $scope: IsvgControllerScope, private svgCanvasService, private undoRedoService, private commandService) {

        //variables
        $scope.colorPalette = ["#1111F3", "#06F406", "#F48703", "#FF3200", "#F4F40B", "#FFFFFF", "#000000"];
        $scope.strokePalette = [1, 2, 3, 4, 5, 7, 10];
        $scope.canvas = {
            height: '1000',
            width: '510'
        };

        $scope.pageCount = 1;

        //functions
        $scope.pathToolClick = () => this.pathToolClick();
        $scope.strokeEraserClick = () => this.strokeEraserClick();
        $scope.freeEraserClick = () => this.freeEraserClick();
        $scope.undoClick = () => this.undoClick();
        $scope.redoClick = () => this.redoClick();
        
    }

    //to draw free hand curve or path 
    private pathToolClick() {
        this.svgCanvasService.setMode("path");
    }

    //to erase fix block 
    private strokeEraserClick() {
        this.svgCanvasService.setMode("strokeEraser");
    }

    //to erase free hand curve
    private freeEraserClick() {
        this.svgCanvasService.setMode("freeEraser");
    }  

    //When user click on undo call this method to undo the last changes
    private undoClick() {
        this.undoRedoService.undo();
    }

    ////When user click on redo call this method to redo the last undo changes
    private redoClick() {
        this.undoRedoService.redo();
    }
}

// Update the app1 variable name to be that of your module variable
app.controller(svgController.controllerId, ['$scope', 'svgCanvasService', 'undoRedoService', 'commandService', ($scope, svgCanvasService, undoRedoService, commandService) =>
    new svgController($scope, svgCanvasService, undoRedoService, commandService)
]);
