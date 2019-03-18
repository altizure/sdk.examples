"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Create a distance measure tool
 * @public
 * @param {object} props
 */
var DistanceMeasure =
/*#__PURE__*/
function () {
  function DistanceMeasure(props) {
    var _this = this;

    _classCallCheck(this, DistanceMeasure);

    _defineProperty(this, "handleMouseDown", function (event) {
      if (_this.enabled) {
        _this.lastDownEvent = event;
      }
    });

    _defineProperty(this, "handleMouseUp", function (event) {
      if (_this.enabled) {
        if (event.button === _this.lastDownEvent.button && Math.abs(event.x - _this.lastDownEvent.x) <= 3 && Math.abs(event.y - _this.lastDownEvent.y) <= 3) {
          if (event.button === 0 && !_this.drawing) {
            _this.startDraw(event);
          } else if (event.button === 0 && _this.drawing) {
            _this.addVertex(event);
          } else if (event.button === 2 && _this.drawing) {
            _this.endDraw(event);
          }
        }
      }
    });

    _defineProperty(this, "handleMouseMove", function (event) {
      if (_this.drawing && _this.enabled) {
        var pt = _this.sandbox.pickOnProjects(event);

        _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);

        var pt0 = _this.drawingLinePts[_this.drawingLinePts.length - 1];

        _this.moveTextTag(pt0, pt);
      }
    });

    _defineProperty(this, "startDraw", function (event) {
      _this.drawing = true;

      var pt = _this.sandbox.pickOnProjects(event);

      var points = [pt, pt];
      var option = Object.assign(_this.defaultOption, {
        points: points
      });
      _this.drawingLine = new altizure.PolyCylinderLineMarker(option);
      _this.drawingLinePts = [Object.assign({}, pt)];

      _this.addTextTag(pt);
    });

    _defineProperty(this, "addVertex", function (event) {
      var pt = _this.sandbox.pickOnProjects(event);

      _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);

      _this.drawingLine.addPoint(pt);

      _this.drawingLinePts.push(Object.assign({}, pt));

      _this.addTextTag(pt);
    });

    _defineProperty(this, "endDraw", function (event) {
      _this.drawing = false;
      var points = _this.drawingLinePts;
      var line = new altizure.PolyCylinderLineMarker(Object.assign(_this.defaultOption, {
        points: points
      }));

      _this.interactLine(line);

      _this.lineCollection.push(line);

      if (_this.drawingLine) {
        _this.drawingLine.destruct();

        _this.drawingLine = undefined;
      }

      _this.drawingLinePts = [];

      if (_this.drawingTextTag) {
        _this.drawingTextTag.destruct();

        _this.drawingTextTag = undefined;
      }

      _this.enabled = false;
    });

    this.sandbox = props.sandbox;
    this.enabled = false;
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    this.lastDownEvent = undefined;
    this.drawing = false;
    this.drawingLine = undefined;
    this.drawingLinePts = [];
    this.lineCollection = [];
    this.drawingTextTag = undefined; // this.drawingTextTagCollection = []

    this.textCollection = [];
    this.defaultOption = {
      name: 'pl2',
      sandbox: this.sandbox,
      color: 'white',
      opacity: 0.9,
      lineWidth: 0.3,
      interactable: true,
      labelsVisible: false
    };
    this.defaultTextOption = {
      textStyle: {
        fillStyle: 'white',
        font: '500 36px Arial',
        outlineWidth: 5
      },
      sandbox: sandbox,
      scale: 0.3
    };
  }

  _createClass(DistanceMeasure, [{
    key: "start",
    value: function start() {
      this.enabled = true;
    }
  }, {
    key: "destruct",
    value: function destruct() {
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mouseup', this.handleMouseUp);
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }, {
    key: "addTextTag",
    value: function addTextTag(position) {
      if (this.drawingTextTag) {
        this.saveTextTag(this.drawingTextTag.position, this.drawingTextTag.text);
        this.drawingTextTag.destruct();
        this.drawingTextTag = undefined;
      }

      var text = '0.0 m';
      var option = Object.assign(this.defaultTextOption, {
        position: position,
        text: text
      });
      this.drawingTextTag = new altizure.TextTagMarker(option);
    }
  }, {
    key: "moveTextTag",
    value: function moveTextTag(pt0, pt1) {
      if (this.drawingTextTag) {
        var lat = (pt0.lat + pt1.lat) / 2;
        var lng = (pt0.lng + pt1.lng) / 2;
        var alt = (pt0.alt + pt1.alt) / 2;
        var pt = {
          lat: lat,
          lng: lng,
          alt: alt // let distance = this.drawingLine.length.toFixed(2)

        };
        var distance = this.sandbox.calculateDistanceBetweenTwoPoints(pt0, pt1);
        this.drawingTextTag.position = pt;
        this.drawingTextTag.text = "".concat(distance.toFixed(2), " m");
      }
    }
  }, {
    key: "saveTextTag",
    value: function saveTextTag(position, text) {
      this.textCollection.push(new altizure.TextTagMarker(Object.assign(this.defaultTextOption, {
        position: position,
        text: text
      })));
    }
  }, {
    key: "interactLine",
    value: function interactLine(line) {
      line.on('mouseenter', function (e) {
        line.color = 'orange';
      });
      line.on('mouseleave', function (e) {
        line.color = 'white';
      });
    }
  }]);

  return DistanceMeasure;
}();