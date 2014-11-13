/// <reference path="../app.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />

var undoRedoService = (function () {
    function undoRedoService($rootScope) {
        this.$rootScope = $rootScope;
        $rootScope.undoStack = new Array(); //we need its value in UI due to this we are using it in rootscope and undostack contains all the added/removed/Moved elements
        $rootScope.redoStack = new Array(); //we need its value in UI due to this we are using it in rootscope and redoStack contain all undo commands
    }
    //It will call to add command into undostack
    undoRedoService.prototype.addCommandToHistory = function (command) {
        this.$rootScope.undoStack.push(command);
        this.$rootScope.redoStack = new Array();
        this.$rootScope.$apply();
    };

    //It will call when user clcks on undo
    undoRedoService.prototype.undo = function () {
        var command = this.$rootScope.undoStack.pop();
        var value = command.unApply();
        this.$rootScope.redoStack.push(command);
        return value;
    };

    //It will call when user wants to redo the undo things
    undoRedoService.prototype.redo = function () {
        var command = this.$rootScope.redoStack.pop();
        var value = command.apply();
        this.$rootScope.undoStack.push(command);
        return value;
    };
    undoRedoService.serviceId = "undoRedoService";
    return undoRedoService;
})();

// Update the app1 variable name to be that of your module variable
app.factory(undoRedoService.serviceId, [
    '$rootScope', function ($rootScope) {
        return new undoRedoService($rootScope);
    }
]);
//# sourceMappingURL=undoRedoService.js.map
