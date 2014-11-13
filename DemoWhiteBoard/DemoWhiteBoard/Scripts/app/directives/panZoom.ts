/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />


// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file
declare function svgPanZoom(element: any, property: any): any;
interface IpanZoom extends ng.IDirective {
   
}

interface IpanZoomScope extends ng.IScope {
   
}

class panZoom implements IpanZoom {
    static directiveId: string = "panZoom";
    restrict: string = "A";

    constructor(private $window: ng.IWindowService) {
    }

    link = (scope, element, attrs) => {
        //Here the value of attribute comes in string so we have to convert it into boolean and pass it. 
        //if the attibute is not passed then it will take default value.



        scope.Panning = false; // as this will be always false and will be true on panEnable
        scope.Zooming = (attrs.zoomEnabled == "false" ? false : true);

        scope.panBtnVisible = scope.Panning;
        //We can set property to the svgPanZoom
        var panZoom = svgPanZoom(element[0], {
            zoomEnabled: scope.Zooming,
            panEnabled: scope.Panning,
            minZoom: 0,
            maxZoom: 10,
            zoomScaleSensitivity: 0.075

        });

        scope.chkZoomEnabled = panZoom.isZoomEnabled(); //tentative will change as per document mode,just checking condition here for future use 
        if (scope.chkZoomEnabled) {
            //this function will invoke the zoomIn method of svg-pan-zoom library
            scope.zoomIn = () => {


                panZoom.zoomIn();
                scope.panBtnVisible = true;
            }
            //this function will invoke the zoomOut method of svg-pan-zoom library
                scope.zoomOut = () => {
                panZoom.zoomOut();
                scope.panBtnVisible = true;
            }
             //this function will invoke the enablePan method of svg-pan-zoom library
            scope.panEnable = () => {
                panZoom.enablePan();
            }

        }

      

       
    }
}

// Update the app variable name to be that of your module variable
app.directive(panZoom.directiveId, ['$window', $window =>
    new panZoom($window)
]);
