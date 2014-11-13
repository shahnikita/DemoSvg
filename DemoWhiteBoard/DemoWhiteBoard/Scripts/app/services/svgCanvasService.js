/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

var svgCanvasService = (function () {
    function svgCanvasService($compile, $rootScope) {
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.idprefix = "svg_";
        this.svgdoc = document;
        this.svgns = "http://www.w3.org/2000/svg";
        this.svgxlink = "http://www.w3.org/1999/xlink";
        this.svgscale = 0.01;
        this.drawingOpacity = 0.5;
        // private $resource;
        this.svgroot = null;
        this.dAttr = null;
        this.started = false;
        this.obj_num = 1;
        this.current_mode = "stickyNote";
        this.currentFill = "none";
        this.currentStroke = "black";
        this.currentStrokeWidth = 1;
        this.currentStrokeStyle = "none";
        this.currentOpacity = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.startX = 0;
        this.startY = 0;
        this.events = {};
        // private functions
        this.assignAttributes = function (node, attrs) {
            for (var i in attrs) {
                if (i == "xmlns:xlink")
                    node.setAttributeNS(this.svgxlink, 'xlink:href', attrs[i]);
                else
                    node.setAttributeNS(null, i, attrs[i]);
            }
        };
        this.cleanupElement = function (element) {
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
        this.addSvgElementFromJson = function (data, svgroot) {
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
        this.getId = function () {
            if (this.events["getid"])
                return this.call("getid", this.obj_num);
            return this.idprefix + this.obj_num;
        };
        this.call = function (event, arg) {
            if (this.events[event]) {
                return this.events[event](this, arg);
            }
        };
        this.$rootScope.svgroot = this.svgroot;
    }
    // public functions
    //mouse events
    svgCanvasService.prototype.mouseDown = function (evt) {
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
                        "opacity": 0.3
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
        }
    };
    svgCanvasService.prototype.mouseUp = function (evt) {
        if (this.started) {
            this.started = false;
            var element = this.svgdoc.getElementById(this.getId());
            switch (this.current_mode) {
                case "path":
                    if (element.getAttribute("d").indexOf("L") == -1 && this.obj_num > 0) {
                        element.remove();
                    } else {
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
            }
        }
    };
    svgCanvasService.prototype.mouseMove = function (evt) {
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
            }
        }
    };

    svgCanvasService.prototype.setMode = function (name) {
        this.current_mode = name;
    };

    svgCanvasService.prototype.setStrokeColor = function (color) {
        if (color != null || color != undefined)
            this.currentStroke = color;
    };

    //not needed for path
    svgCanvasService.prototype.setFillColor = function (color) {
        this.currentFill = color;
    };

    svgCanvasService.prototype.setStrokeWidth = function (val) {
        if (val != null || val != undefined)
            this.currentStrokeWidth = val;
    };

    svgCanvasService.prototype.setOffsetsForCanvas = function (x, y) {
        this.offsetX = x;
        this.offsetY = y;
    };

    svgCanvasService.prototype.bind = function (event, f) {
        this.events[event] = f;
    };

    svgCanvasService.prototype.setIdPrefix = function (p) {
        this.idprefix = p;
    };
    svgCanvasService.serviceId = "svgCanvasService";
    return svgCanvasService;
})();

// Update the app1 variable name to be that of your module variable
app.factory(svgCanvasService.serviceId, [
    '$compile', '$rootScope', function ($compile, $rootScope) {
        return new svgCanvasService($compile, $rootScope);
    }
]);
//# sourceMappingURL=svgCanvasService.js.map
