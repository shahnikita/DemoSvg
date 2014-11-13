/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />



// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IsvgCanvasService {
    setMode: (name) => void;
    setStrokeColor: (color) => void;
    setFillColor: (color) => void;
    setStrokeWidth: (val) => void;
    setOffsetsForCanvas: (x, y) => void;
    bind: (event, f) => void;
    setIdPrefix: (p) => void;
}

class svgCanvasService implements IsvgCanvasService {
    static serviceId: string = "svgCanvasService";

    private idprefix: string = "svg_";
    private svgdoc: any = document;
    private svgns: string = "http://www.w3.org/2000/svg";
    private svgxlink: string = "http://www.w3.org/1999/xlink"
    private svgscale: number = 0.01;
    private drawingOpacity: number = 0.5;
    // private $resource;




    public svgroot: any = null;

    private dAttr: any = null;
    private started: boolean = false;
    private obj_num: number = 1;
    private current_mode: string = "stickyNote";
    private currentFill: string = "none";
    private currentStroke: string = "black";
    private currentStrokeWidth: number = 1;
    private currentStrokeStyle: string = "none";
    private currentOpacity: number = 1;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private startX: number = 0;
    private startY: number = 0;
    private events = {};

    constructor(private $compile, private $rootScope) {

        this.$rootScope.svgroot = this.svgroot;
    }
    // private functions

    private assignAttributes = function (node, attrs) {
        for (var i in attrs) {
            if (i == "xmlns:xlink")
                node.setAttributeNS(this.svgxlink, 'xlink:href', attrs[i]);
            else
                node.setAttributeNS(null, i, attrs[i]);
        }
    };
    private cleanupElement = function (element) {
        if (element.getAttribute('fill-opacity') == '1')
            element.removeAttribute('fill-opacity');
        if (element.getAttribute('opacity') == '1')
            element.removeAttribute('opacity');
        if (element.getAttribute('stroke') == 'none')
            element.removeAttribute('stroke');
        if (element.getAttribute('stroke-dasharray') == 'none')
            element.removeAttribute('stroke-dasharray');
        if (element.getAttribute('stroke-opacity') == '1')
            element.removeAttribute('stroke-opacity');
        if (element.getAttribute('stroke-width') == '1')
            element.removeAttribute('stroke-width');
    };
    private addSvgElementFromJson = function (data, svgroot) {
        var shape = null;
        if (data.element != null && data.element != undefined) {
            shape = this.svgdoc.createElementNS(this.svgns, data.element);
            this.assignAttributes(shape, data.Attr);
            this.cleanupElement(shape);
            svgroot.append(shape);
            return shape;
        }
        return shape;
    };
    private getId = function () {
        if (this.events["getid"]) return this.call("getid", this.obj_num);
        return this.idprefix + this.obj_num;
    };
    private call = function (event, arg) {
        if (this.events[event]) {
            return this.events[event](this, arg);
        }
    };

    // public functions

    //mouse events

    mouseDown(evt) {

        var x = evt.pageX - this.offsetX;
        var y = evt.pageY - this.offsetY;
        this.started = true;

        switch (this.current_mode) {
            case "path":
                this.dAttr = "M" + x + " " + y + " ";
                return this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.dAttr,
                        "id": this.getId(),
                        "fill": this.currentFill,
                        "stroke": this.currentStroke,
                        "stroke-width": this.currentStrokeWidth,
                        "opacity": this.drawingOpacity
                    }

                }, this.svgroot);

                break;
            case "highlighter":

                this.dAttr = "M" + x + " " + y + " ";
                return this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.dAttr,
                        "id": this.getId(),
                        "fill": this.currentFill,
                        "stroke": this.currentStroke,
                        "stroke-width": this.currentStrokeWidth,
                        "opacity": 0.3,
                    }

                }, this.svgroot);
                break;
            case "rect":
                this.startX = x;
                this.startY = y;
                return this.addSvgElementFromJson({
                    "element": "rect",
                    "Attr": {
                        "x": x,
                        "y": y,
                        "width": 1,
                        "height": 1,
                        "id": this.getId(),
                        "fill": "#FFFFFF",
                        "stroke": this.currentStroke,
                        "stroke-width": 1,
                        "opacity": this.drawingOpacity
                    }
                }, this.svgroot);

            case "circle":
                this.startX = x;
                this.startY = y;
                return this.addSvgElementFromJson({
                    "element": "circle",
                    "Attr": {
                        "cx": x,
                        "cy": y,
                        "r": 0,
                        "id": this.getId(),
                        "fill": "#FFFFFF",
                        "stroke": this.currentStroke,
                        "stroke-width": 1,
                        "opacity": this.drawingOpacity
                    }
                }, this.svgroot);


            case "line":
                this.startX = x;
                this.startY = y;
                return this.addSvgElementFromJson({
                    "element": "line",
                    "Attr": {
                        "x1": x,
                        "y1": y,
                        "x2": x,
                        "y2": y,
                        "id": this.getId(),
                        "stroke": this.currentStroke,
                        "stroke-width": 1,
                        "opacity": 1
                    }
                }, this.svgroot);

            case "arrow":
                this.dAttr = "M " + x + " " + y + " ";
                return this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.dAttr,
                        "id": this.getId(),
                        "fill": this.currentFill,
                        "stroke": this.currentStroke,
                        "stroke-width": 1,
                        "opacity": 0.5,
                        "marker-end": '',
                        "marker-mid": ''

                    }

                }, this.svgroot);

            case "doubleHeadedArrow":
                this.dAttr = "M " + x + " " + y + " ";
                return this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.dAttr,
                        "id": this.getId(),
                        "fill": this.currentFill,
                        "stroke": this.currentStroke,
                        "stroke-width": 1,
                        "opacity": 0.5,
                        "marker-end": '',
                        "marker-start": '',
                        "marker-mid": ''

                    }

                }, this.svgroot);

            case "triangle":
                this.dAttr = "M " + x + " " + y + " ";

                return this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.dAttr,
                        "id": this.getId(),
                        "fill": this.currentFill,
                        "stroke": this.currentStroke,
                        "stroke-width": this.currentStrokeWidth,
                        "opacity": 0.5
                    }

                }, this.svgroot);

            case "ellipse":

                break;
            case "delete":

                break;
            case "strokeEraser":
                this.startX = x;
                this.startY = y;
                return this.addSvgElementFromJson({
                    "element": "rect",
                    "Attr": {
                        "x": x,
                        "y": y,
                        "width": 1,
                        "height": 1,
                        "id": this.getId(),
                        "fill": "#FFFFFF",
                        "stroke": "#000000",
                        "stroke-width": 1,
                        "stroke-dasharray": "5,5",
                        "opacity": this.currentOpacity,
                        "fill-opacity": 1
                    }
                }, this.svgroot);
                break;


            case "freeEraser":
                this.dAttr = "M" + x + " " + y + " ";
                this.started = true;
                return this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.dAttr,
                        "id": this.getId(),
                        "fill": "none",
                        "stroke": "#FFFFFF",
                        "stroke-width": 10,
                        "opacity": this.currentOpacity
                    }

                }, this.svgroot);
            case "stickyNote":
                this.startX = x;
                this.startY = y;

                
                this.addSvgElementFromJson({
                    "element": "use",
                    "Attr": {
                        "xmlns:xlink": "#StickyNote",
                        "id": this.getId()
                    }
                }, this.svgroot);
                break;

        }//switch


    }
    mouseUp(evt) {
        if (this.started) {

            this.started = false;
            var element = this.svgdoc.getElementById(this.getId());
            switch (this.current_mode) {
                case "path":
                    if (element.getAttribute("d").indexOf("L") == -1 && this.obj_num > 0) {
                        element.remove();
                    }
                    else {
                        this.dAttr = 0;
                        element.setAttribute("opacity", this.currentOpacity);
                        //It will broadcast event that the element is added into the document
                        this.$rootScope.$broadcast('elementAddedOrRemoved', { element: element, svgroot: this.svgroot });
                        this.obj_num++;
                    }
                    break;
                case "rect":
                    break;
                case "line":
                    break;
                case "ellipse":
                    break;
                case "freehandcircle":
                    break;
                case "strokeEraser":
                    this.dAttr = 0;
                    //var element = this.svgdoc.getElementById("strokeEraser_" + this.obj_num);
                    element.removeAttribute('stroke-dasharray');
                    element.removeAttribute('stroke');
                    //It will broadcast event that the element is removed using stroke Eraser
                    this.$rootScope.$broadcast('elementAddedOrRemoved', { element: element, svgroot: this.svgroot });
                    this.obj_num++;
                    break;

                case "freeEraser":
                    //var element = this.svgdoc.getElementById("freeEraser_" + this.obj_num);
                    if (element.getAttribute("d").indexOf("L") == -1 && this.obj_num > 0) {
                        element.remove();
                    }
                    //It will broadcast event that the element is removed using free Eraser
                    this.$rootScope.$broadcast('elementAddedOrRemoved', { element: element, svgroot: this.svgroot });
                    this.obj_num++;
                    this.dAttr = 0;
                    break;
                case "stickyNote":

                    element.setAttribute("my-text-box", null);
                    this.$compile(angular.element(element))(this.$rootScope);
                    this.obj_num++;
                    break;
            }//switch
        }


    }
    mouseMove(evt) {

        if (this.started) {

            var x = evt.pageX - this.offsetX;
            var y = evt.pageY - this.offsetY;
            var shape = this.svgdoc.getElementById(this.getId());
            switch (this.current_mode) {
                case "path":
                    this.dAttr = this.dAttr + "L" + x + " " + y + " ";
                    shape.setAttributeNS(null, "d", this.dAttr);
                    break;

                case "rect":
                    break;
                case "line":
                    break;
                case "ellipse":
                    break;
                case "freehandcircle":
                    break;
                case "strokeEraser":

                    shape.setAttributeNS(null, "x", Math.min(this.startX, x));
                    shape.setAttributeNS(null, "y", Math.min(this.startY, y));
                    shape.setAttributeNS(null, "width", Math.abs(x - this.startX));
                    shape.setAttributeNS(null, "height", Math.abs(y - this.startY));
                    break;

                case "freeEraser":

                    this.dAttr = this.dAttr + "L" + x + " " + y + " ";
                    shape.setAttributeNS(null, "d", this.dAttr);

                    break;
                case "stickyNote":

                    shape.setAttributeNS(null, "x", Math.min(this.startX, x));
                    shape.setAttributeNS(null, "y", Math.min(this.startY, y));
                    shape.setAttributeNS(null, "width", Math.abs(x - this.startX));
                    shape.setAttributeNS(null, "height", Math.abs(y - this.startY));
                    break;
            }//switch

        }//if
    }


    setMode(name) {
        this.current_mode = name;
    }

    setStrokeColor(color) {
        if (color != null || color != undefined)
            this.currentStroke = color;
    }
    //not needed for path
    setFillColor(color) {
        this.currentFill = color;
    }

    setStrokeWidth(val) {
        if (val != null || val != undefined)
            this.currentStrokeWidth = val;
    }

    setOffsetsForCanvas(x, y) {
        this.offsetX = x;
        this.offsetY = y;
    }

    bind(event, f) {
        this.events[event] = f;
    }

    setIdPrefix(p) {
        this.idprefix = p;
    }



}

// Update the app1 variable name to be that of your module variable
app.factory(svgCanvasService.serviceId, ['$compile', '$rootScope', ($compile, $rootScope) =>
    new svgCanvasService($compile, $rootScope)
]);
