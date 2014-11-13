/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />
// Update the reference to app1.ts to be that of your module file.
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the .d.ts reference paths,
// then adjust the path value to be relative to this file


interface IsvgElement {

    mouseDown: (evt) => void;
    mouseUp: (evt) => void;
    mouseMove: (evt) => void;

    setMode: (name) => void;
    setStrokeColor: (color) => void;
    setFillColor: (color) => void;
    setStrokeWidth: (val) => void;
    setOffsetsForCanvas: (x, y) => void;
    bind: (event, f) => void;
    setIdPrefix: (p) => void;
}

class svgElement implements IsvgElement {
    static serviceId: string = "svgElement";

    private idprefix: string = "svg_";
    private svgdoc: any = document;
    private svgns: string = "http://www.w3.org/2000/svg";


    private $resource;



    public svgroot: any = null;

    private d_attr: any = null;
    private started: boolean = false;
    private obj_num: number = 1;
    private current_mode: string = null;
    private current_fill: string = "none";
    private current_stroke: string = "black";
    private current_stroke_width: number = 1;
    private current_stroke_style: string = "none";
    private current_opacity: number = 1;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private start_x: number = 0;
    private start_y: number = 0;
    private events = {};

    constructor(private resource: ng.resource.IResourceService) {
        this.$resource = resource;

    }

    // private functions

    private assignAttributes = function (node, attrs) {
        for (var i in attrs) {
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
    private addSvgElementFromJson = function (data) {

        var shape = this.svgdoc.createElementNS(this.svgns, data.element);
        this.assignAttributes(shape, data.Attr);
        this.cleanupElement(shape);
        this.svgroot.append(shape);
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
                this.d_attr = "M" + x + " " + y + " ";
                this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.d_attr,
                        "id": this.getId(),
                        "fill": this.current_fill,
                        "stroke": this.current_stroke,
                        "stroke-width": this.current_stroke_width,
                        "opacity": 0.5
                    }

                });

                break;
            case "rect":
                break;
            case "line":

                break;
            case "ellipse":

                break;
            case "delete":

                break;
            case "strokeEraser":
                this.start_x = x;
                this.start_y = y;
                this.addSvgElementFromJson({
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
                        "stroke-dasharray": "5,5"
                    }
                });
                break;

            case "freeEraser":
                this.d_attr = "M" + x + " " + y + " ";
                this.started = true;
                this.addSvgElementFromJson({
                    "element": "path",
                    "Attr": {
                        "d": this.d_attr,
                        "id": this.getId(),
                        "fill": "none",
                        "stroke": "#FFFFFF",
                        "stroke-width": 10,
                        "opacity": this.current_opacity
                    }

                });
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
                        this.d_attr = 0;
                        this.obj_num++;
                        element.setAttribute("opacity", this.current_opacity);
                       
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
                    this.d_attr = 0;
                    this.obj_num++;
                    //var element = this.svgdoc.getElementById("strokeEraser_" + this.obj_num);
                    element.removeAttribute('stroke-dasharray');
                    element.removeAttribute('stroke');
                   
                    break;

                case "freeEraser":
                    this.d_attr = 0;
                    this.obj_num++;
                    //var element = this.svgdoc.getElementById("freeEraser_" + this.obj_num);
                    if (element.getAttribute("d").indexOf("L") == -1 && this.obj_num > 0) {
                        element.remove();
                    }
                   
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
                    this.d_attr = this.d_attr + "L" + x + " " + y + " ";                 
                    shape.setAttributeNS(null, "d", this.d_attr);
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
                  
                    shape.setAttributeNS(null, "x", Math.min(this.start_x, x));
                    shape.setAttributeNS(null, "y", Math.min(this.start_y, y));
                    shape.setAttributeNS(null, "width", Math.abs(x - this.start_x));
                    shape.setAttributeNS(null, "height", Math.abs(y - this.start_y));
                    break;

                case "freeEraser":

                    this.d_attr = this.d_attr + "L" + x + " " + y + " ";
                    shape.setAttributeNS(null, "d", this.d_attr);

                    break;
            }//switch

        }//if
    }


    //setting events
    setMode(name) {
        this.current_mode = name;
    }

    setStrokeColor(color) {
        if (color != null || color != undefined)
            this.current_stroke = color;
    }
    //not needed for path
    setFillColor(color) {
        this.current_fill = color;
    }

    setStrokeWidth(val) {
        if (val != null || val != undefined)
            this.current_stroke_width = val;
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
app.factory(svgElement.serviceId, ['$resource', ($resource) =>
    new svgElement($resource)
]);
