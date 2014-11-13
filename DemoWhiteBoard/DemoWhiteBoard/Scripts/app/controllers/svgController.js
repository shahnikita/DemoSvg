/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var svgController = (function () {
    function svgController($scope, svgCanvasService, undoRedoService, commandService) {
        var _this = this;
        this.$scope = $scope;
        this.svgCanvasService = svgCanvasService;
        this.undoRedoService = undoRedoService;
        this.commandService = commandService;
        //variables
        $scope.colorPalette = ["#1111F3", "#06F406", "#F48703", "#FF3200", "#F4F40B", "#FFFFFF", "#000000"];
        $scope.strokePalette = [1, 2, 3, 4, 5, 7, 10];
        $scope.canvas = {
            height: '1000',
            width: '510'
        };

        $scope.pageCount = 1;

        //functions
        $scope.pathToolClick = function () {
            return _this.pathToolClick();
        };
        $scope.strokeEraserClick = function () {
            return _this.strokeEraserClick();
        };
        $scope.freeEraserClick = function () {
            return _this.freeEraserClick();
        };
        $scope.undoClick = function () {
            return _this.undoClick();
        };
        $scope.redoClick = function () {
            return _this.redoClick();
        };
    }
    //to draw free hand curve or path
    svgController.prototype.pathToolClick = function () {
        this.svgCanvasService.setMode("path");
    };

    //to erase fix block
    svgController.prototype.strokeEraserClick = function () {
        this.svgCanvasService.setMode("strokeEraser");
    };

    //to erase free hand curve
    svgController.prototype.freeEraserClick = function () {
        this.svgCanvasService.setMode("freeEraser");
    };

    //When user click on undo call this method to undo the last changes
    svgController.prototype.undoClick = function () {
        this.undoRedoService.undo();
    };

    ////When user click on redo call this method to redo the last undo changes
    svgController.prototype.redoClick = function () {
        this.undoRedoService.redo();
    };
    svgController.controllerId = "svgController";
    return svgController;
})();

// Update the app1 variable name to be that of your module variable
app.controller(svgController.controllerId, [
    '$scope', 'svgCanvasService', 'undoRedoService', 'commandService', function ($scope, svgCanvasService, undoRedoService, commandService) {
        return new svgController($scope, svgCanvasService, undoRedoService, commandService);
    }
]);
//# sourceMappingURL=svgController.js.map
