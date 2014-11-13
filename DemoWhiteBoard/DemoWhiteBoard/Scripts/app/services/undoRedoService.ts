/// <reference path="../app.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />


// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IundoRedoService {
     //functions
    addCommandToHistory: (command) => void;
    undo: () => string;
    redo: () => string;
 
    
}

class undoRedoService implements IundoRedoService {
    static serviceId: string = "undoRedoService";
   

    constructor(private $rootScope) {
        $rootScope.undoStack = new Array(); //we need its value in UI due to this we are using it in rootscope and undostack contains all the added/removed/Moved elements
        $rootScope.redoStack = new Array();//we need its value in UI due to this we are using it in rootscope and redoStack contain all undo commands
   
    }
    //It will call to add command into undostack
    addCommandToHistory(command) {
        this.$rootScope.undoStack.push(command);
        this.$rootScope.redoStack = new Array();
        this.$rootScope.$apply();
    }

    //It will call when user clcks on undo 
    undo() {
        var command = this.$rootScope.undoStack.pop();
        var value = command.unApply();
        this.$rootScope.redoStack.push(command);
        return value;
    }

    //It will call when user wants to redo the undo things
    redo() {
        var command = this.$rootScope.redoStack.pop();
        var value = command.apply();
        this.$rootScope.undoStack.push(command);
        return value;
    }  
    
}

// Update the app1 variable name to be that of your module variable
app.factory(undoRedoService.serviceId, ['$rootScope', ($rootScope) =>
    new undoRedoService($rootScope)
]);
