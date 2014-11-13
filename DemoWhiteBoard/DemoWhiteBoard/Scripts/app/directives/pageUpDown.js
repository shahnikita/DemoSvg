/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var pageUpDown = (function () {
    function pageUpDown($rootScope) {
        this.$rootScope = $rootScope;
        this.restrict = "A";
        this.link = function (scope, element, attrs) {
            //the attributes that set the duration and offsetTop for scrollTo method
            var offsetTop = attrs.offsetTop || 70;
            var duration = attrs.duration || 'slow';

            scope.pageCount = 1; // this value has to fetched from the data base for now it is initialized with 1

            // this block of code is to check whether there is single page or more than one page
            // so that the PageUp & PageDown button is disbled if there is only one page or
            // if there is more than one page then PageDownButton is enabled
            //calculate number of pages
            scope.$pages = element.find("g").children("svg").length;

            if (scope.$pages > 1) {
                scope.pageDownBtnDisable = false;
            } else {
                scope.pageDownBtnDisable = true;
                scope.pageUpBtnDisable = true;
            }
            if (scope.pageCount == 1) {
                scope.pageUpBtnDisable = true;
            }

            //this method cause the user to scroll to the previous page
            scope.pageUp = function () {
                //this code block enable the PageDownButton  if there exist next page
                if (scope.pageCount <= scope.$pages) {
                    scope.pageDownBtnDisable = false;
                }

                if (scope.pageCount > 1) {
                    --scope.pageCount;
                    element.scrollTo('#page' + (scope.pageCount), { duration: 'slow' });

                    // this code is used to disable the PageUpButton if there is no page above the
                    // current page.
                    if (scope.pageCount == 1) {
                        scope.pageUpBtnDisable = true;
                    }
                }
            };

            //this method cause the user to scroll to the next page
            scope.pageDown = function () {
                scope.$pages = element.find("g").children("svg").length;

                if (scope.pageCount < scope.$pages) {
                    ++scope.pageCount;
                    element.scrollTo('#page' + scope.pageCount, { duration: duration });

                    // this code is used to disable the PageDownButton if it has reached the last page
                    if (scope.pageCount == scope.$pages) {
                        scope.pageDownBtnDisable = true;
                    }
                }

                //this code block enable the PageUpButton  if there exist previous page
                if (scope.pageCount > 1) {
                    scope.pageUpBtnDisable = false;
                }
            };
        };
    }
    pageUpDown.directiveId = "pageUpDown";
    return pageUpDown;
})();

// Update the app1 variable name to be that of your module variable
app.directive(pageUpDown.directiveId, [
    '$rootScope', function ($rootScope) {
        return new pageUpDown($rootScope);
    }
]);
//# sourceMappingURL=pageUpDown.js.map
