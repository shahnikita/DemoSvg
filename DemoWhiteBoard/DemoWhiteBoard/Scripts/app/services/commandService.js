/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file

var commandService = (function () {
    function commandService($rootScope, undoRedoService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.undoRedoService = undoRedoService;
        $rootScope.$on('elementAddedOrRemoved', function (event, result) {
            //This will call addCommandToHistory and pass new object of addOrRemoveElementCommand when anything added or erase from the document.
            _this.undoRedoService.addCommandToHistory(new _this.addOrRemoveElementCommand(result.element, result.svgroot));
        });
    }
    //When use erase or add something at that time this command will add to the undostack
    commandService.prototype.addOrRemoveElementCommand = function (currentElement, svgroot) {
        this.currentElement = currentElement;
        this.svgroot = svgroot;

        //This will use for the redo and add element into the document
        this.apply = function () {
            this.svgroot.append(currentElement);
        };

        //This will use for the undo and remove element from the document
        this.unApply = function () {
            currentElement.remove();
        };
    };
    commandService.serviceId = "commandService";
    return commandService;
})();

// Update the app1 variable name to be that of your module variable
app.factory(commandService.serviceId, [
    '$rootScope', 'undoRedoService', function ($rootScope, undoRedoService) {
        return new commandService($rootScope, undoRedoService);
    }
]);
//# sourceMappingURL=commandService.js.map
