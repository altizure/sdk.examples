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

var markerlist = []

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

          if (pt != undefined) {
            _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
            var pt0 = _this.drawingLinePts[_this.drawingLinePts.length - 1];
            _this.moveTextTag(pt0, pt);
          }
        }
      });

      _defineProperty(this, "startDraw", function (event) {

        _this.drawing = true;
        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {

          var points = [pt, pt];
          var option = Object.assign(_this.defaultOption, {
            points: points
          });
          _this.drawingLine = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts = [Object.assign({}, pt)];

          _this.addTextTag(pt);
        }
        else {
          _this.drawing = false
        }
      });

      _defineProperty(this, "addVertex", function (event) {
        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
          _this.drawingLine.addPoint(pt);
          _this.drawingLinePts.push(Object.assign({}, pt));
          _this.addTextTag(pt);
        }
      });

      _defineProperty(this, "endDraw", function (event) {
        _this.drawing = false;
        var points = _this.drawingLinePts;
        var line = new altizure.PolyCylinderLineMarker(Object.assign(_this.defaultOption, {
          points: points
        }));
        markerlist.push(line)

        _this.lineCollection.push(line);

        if (_this.drawingLine) {
          _this.drawingLine.destruct();
          _this.drawingLine = undefined;
        }

        if (_this.drawingTextTag) {
          _this.drawingTextTag.destruct();
          _this.drawingTextTag = undefined;
        }
        _this.textCollection.map(texttag => {
          markerlist.push(texttag)
        })
        _this.textCollection = []
        _this.drawingLinePts = [];
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
      key: "stop",
      value: function stop() {
        this.enabled = false;
        this.drawing = false
        if (this.drawingLine) {
          this.drawingLine.destruct();
          this.drawingLine = undefined;
        }
        this.drawingLinePts = [];
        if (this.drawingTextTag) {
          this.drawingTextTag.destruct();
          this.drawingTextTag = undefined;
        }
        if (this.textCollection.length >= 1) {
          this.textCollection.map(texttag => {
            texttag.destruct()
          })
        }

        this.textCollection = []
      }
    },

    {
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
            alt: alt
          };
          var distance = this.sandbox.calculateDistanceBetweenTwoPoints(pt0, pt1);
          this.drawingTextTag.position = pt;
          this.drawingTextTag.text = "".concat(distance.toFixed(2), " m");
        }
      }
    }, {
      key: "saveTextTag",
      value: function saveTextTag(position, text) {
        let texttag = new altizure.TextTagMarker(Object.assign(this.defaultTextOption, {
          position: position,
          text: text
        }))
        this.textCollection.push(texttag);

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


var RightAngleMeasure =
  /*#__PURE__*/
  function () {
    function RightAngleMeasure(props) {
      var _this = this;

      _classCallCheck(this, RightAngleMeasure);

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
            } else if (event.button === 2 && _this.drawing) {
              _this.addVertex(event);
              _this.endDraw(event);
            }
          }
        }
      });

      _defineProperty(this, "handleMouseMove", function (event) {
        if (_this.drawing && _this.enabled) {
          var pt = _this.sandbox.pickOnProjects(event);
          var ptold = _this.drawingLinePts[_this.drawingLinePts.length - 1]
          if (pt != undefined) {
            var ptnew = { lng: pt.lng, lat: pt.lat, alt: ptold.alt }
            _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
            _this.drawingLine_2.setPoint(_this.drawingLine_2.pointsNumber - 1, ptnew);
            _this.drawingLine_3.setPoint(_this.drawingLine_2.pointsNumber - 2, ptnew);
            _this.drawingLine_3.setPoint(_this.drawingLine_2.pointsNumber - 1, pt);

            _this.moveTextTag(ptold, pt, ptold, ptnew, ptnew, pt);
          }

        }
      });

      _defineProperty(this, "startDraw", function (event) {

        _this.drawing = true;
        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {

          var points = [pt, pt];
          var option = Object.assign(_this.defaultOption, {
            points: points
          });
          _this.drawingLine = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts = [Object.assign({}, pt)];
          _this.drawingLine_2 = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts_2 = [Object.assign({}, pt)];
          _this.drawingLine_3 = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts_3 = [Object.assign({}, pt)];
          _this.addTextTag(pt);
        }
        else {
          _this.drawing = false
        }
      });

      _defineProperty(this, "addVertex", function (event) {
        var pt = _this.sandbox.pickOnProjects(event);
        var ptold = _this.drawingLinePts[_this.drawingLinePts.length - 1]
        var ptnew = { lng: pt.lng, lat: pt.lat, alt: ptold.alt }

        _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
        _this.drawingLine_2.setPoint(_this.drawingLine_2.pointsNumber - 1, ptnew);
        _this.drawingLine_3.setPoint(_this.drawingLine_2.pointsNumber - 2, ptnew);
        _this.drawingLine_3.setPoint(_this.drawingLine_2.pointsNumber - 1, pt);

        _this.drawingLinePts.push(Object.assign({}, pt));
        _this.drawingLinePts_2.push(Object.assign({}, ptnew));
        _this.drawingLinePts_3[_this.drawingLine_2.pointsNumber - 1] = ptnew
        _this.drawingLinePts_3.push(Object.assign({}, pt));
      });

      _defineProperty(this, "endDraw", function (event) {
        _this.drawing = false;
        var points = _this.drawingLinePts;
        var line = new altizure.PolyCylinderLineMarker(Object.assign(_this.defaultOption, {
          points: points
        }));

        _this.newsaveTextTag(points[0], points[1])
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

        var points_2 = _this.drawingLinePts_2;
        var line_2 = new altizure.PolyCylinderLineMarker(Object.assign(_this.defaultOption, {
          points: points_2
        }));
        _this.newsaveTextTag(points_2[0], points_2[1])
        _this.interactLine(line_2);

        _this.lineCollection.push(line_2);
        if (_this.drawingLine_2) {
          _this.drawingLine_2.destruct();
          _this.drawingLine_2 = undefined;
        }

        _this.drawingLinePts_2 = [];
        if (_this.drawingTextTag_2) {
          _this.drawingTextTag_2.destruct();
          _this.drawingTextTag_2 = undefined;
        }

        var points_3 = _this.drawingLinePts_3;
        var line_3 = new altizure.PolyCylinderLineMarker(Object.assign(_this.defaultOption, {
          points: points_3
        }))


        _this.newsaveTextTag(points_3[1], points_3[2])
        _this.lineCollection.push(line_3);

        markerlist.push(line)
        markerlist.push(line_2)
        markerlist.push(line_3)

        if (_this.drawingLine_3) {
          _this.drawingLine_3.destruct();
          _this.drawingLine_3 = undefined;
        }
        _this.drawingLinePts_3 = [];
        if (_this.drawingTextTag_3) {
          _this.drawingTextTag_3.destruct();
          _this.drawingTextTag_3 = undefined;
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
      this.drawingLine_2 = undefined;
      this.drawingLinePts_2 = [];
      this.drawingLine_3 = undefined;
      this.drawingLinePts_3 = [];
      this.lineCollection = [];
      this.drawingTextTag = undefined;
      this.drawingTextTag_2 = undefined;
      this.drawingTextTag_3 = undefined;

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

    _createClass(RightAngleMeasure, [{
      key: "start",
      value: function start() {
        this.enabled = true;
      }
    },
    {
      key: "stop",
      value: function stop() {
        this.enabled = false;
        this.drawing = false
        if (this.drawingLine_3) {
          this.drawingLine_3.destruct();
          this.drawingLine_3 = undefined;
        }
        this.drawingLinePts_3 = [];
        if (this.drawingTextTag_3) {
          this.drawingTextTag_3.destruct();
          this.drawingTextTag_3 = undefined;
        }
        if (this.drawingLine) {
          this.drawingLine.destruct();
          this.drawingLine = undefined;
        }
        this.drawingLinePts = [];
        if (this.drawingTextTag) {
          this.drawingTextTag.destruct();
          this.drawingTextTag = undefined;
        }
        if (this.drawingLine_2) {
          this.drawingLine_2.destruct();
          this.drawingLine_2 = undefined;
        }
        this.drawingLinePts_2 = [];
        if (this.drawingTextTag_2) {
          this.drawingTextTag_2.destruct();
          this.drawingTextTag_2 = undefined;
        }
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
        if (this.drawingTextTag_2) {
          this.saveTextTag(this.drawingTextTag_2.position, this.drawingTextTag_2.text);
          this.drawingTextTag_2.destruct();
          this.drawingTextTag_2 = undefined;
        }
        if (this.drawingTextTag_3) {
          this.saveTextTag(this.drawingTextTag_3.position, this.drawingTextTag_3.text);
          this.drawingTextTag_3.destruct();
          this.drawingTextTag_3 = undefined;
        }

        var text = '0.0 m';
        var option = Object.assign(this.defaultTextOption, {
          position: position,
          text: text
        });
        this.drawingTextTag = new altizure.TextTagMarker(option);
        this.drawingTextTag_2 = new altizure.TextTagMarker(option);
        this.drawingTextTag_3 = new altizure.TextTagMarker(option);

      }
    }, {
      key: "moveTextTag",
      value: function moveTextTag(pt0, pt1, pt2, pt3, pt4, pt5) {
        if (this.drawingTextTag) {
          var lat = (pt0.lat + pt1.lat) / 2;
          var lng = (pt0.lng + pt1.lng) / 2;
          var alt = (pt0.alt + pt1.alt) / 2;
          var pt = {
            lat: lat,
            lng: lng,
            alt: alt

          };
          var distance = this.sandbox.calculateDistanceBetweenTwoPoints(pt0, pt1);
          this.drawingTextTag.position = pt;
          this.drawingTextTag.text = "".concat(distance.toFixed(2), " m");
        }
        if (this.drawingTextTag_2) {
          var lat_2 = (pt2.lat + pt3.lat) / 2;
          var lng_2 = (pt2.lng + pt3.lng) / 2;
          var alt_2 = (pt2.alt + pt3.alt) / 2;
          var pt_2 = {
            lat: lat_2,
            lng: lng_2,
            alt: alt_2

          };
          var distance_2 = this.sandbox.calculateDistanceBetweenTwoPoints(pt2, pt3);
          this.drawingTextTag_2.position = pt_2;
          this.drawingTextTag_2.text = "".concat(distance_2.toFixed(2), " m");
        }
        if (this.drawingTextTag_3) {
          var lat_3 = (pt4.lat + pt5.lat) / 2;
          var lng_3 = (pt4.lng + pt5.lng) / 2;
          var alt_3 = (pt4.alt + pt5.alt) / 2;
          var pt_3 = {
            lat: lat_3,
            lng: lng_3,
            alt: alt_3

          };
          var distance_3 = this.sandbox.calculateDistanceBetweenTwoPoints(pt4, pt5);
          this.drawingTextTag_3.position = pt_3;
          this.drawingTextTag_3.text = "".concat(distance_3.toFixed(2), " m");
        }
      }
    }, {
      key: "saveTextTag",
      value: function saveTextTag(position, text) {
        var texttag = new altizure.TextTagMarker(Object.assign(this.defaultTextOption, {
          position: position,
          text: text
        }))
        this.textCollection.push(texttag)
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
    }, {
      key: "newsaveTextTag",
      value: function newsaveTextTag(pt0, pt1) {
        var lat = (pt0.lat + pt1.lat) / 2;
        var lng = (pt0.lng + pt1.lng) / 2;
        var alt = (pt0.alt + pt1.alt) / 2;
        var pt = {
          lat: lat,
          lng: lng,
          alt: alt

        };
        var distance = this.sandbox.calculateDistanceBetweenTwoPoints(pt0, pt1);
        var text = "".concat(distance.toFixed(2), " m");
        var texttag = new altizure.TextTagMarker(Object.assign(this.defaultTextOption, {
          position: pt,
          text: text
        }))
        this.textCollection.push(texttag)
        markerlist.push(texttag)
      }
    },]);

    return RightAngleMeasure;
  }();

var VolumeMeasure =
  /*#__PURE__*/
  function () {
    function VolumeMeasure(props) {
      var _this = this;

      _classCallCheck(this, VolumeMeasure);

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
            } else if (event.button === 0 && _this.drawing && !_this.height) {
              _this.addVertex(event);
            } else if (event.button === 2 && _this.drawing && !_this.height) {
              _this.endflatDraw(event);
            }
            else if (event.button === 2 && _this.drawing && _this.height) {
              _this.endDraw(event);
            }
          }
        }
      });

      _defineProperty(this, "handleMouseMove", function (event) {
        if (_this.drawing && _this.enabled && !_this.height) {
          var pt = _this.sandbox.pickOnProjects(event);
          if (pt != undefined) {
            _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);

            _this.drawingLine_2.setPoint(0, _this.drawingLinePts[0]);
            _this.drawingLine_2.setPoint(1, pt);
          }

        }
        else if (_this.drawing && _this.enabled && _this.height) {
          let delty = (_this.startpoint.y - event.y) / 4
          _this.polygon1.top = delty
        }

      });

      _defineProperty(this, "startDraw", function (event) {
        _this.drawing = true;

        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          var points = [pt, pt];
          var option = Object.assign(_this.defaultOption, {
            points: points
          });
          _this.drawingLine_2 = new altizure.PolyCylinderLineMarker({
            name: 'pl1',
            sandbox: sandbox,
            points: [pt, pt],
            color: 'white',
            lineWidth: 0.3
          })
          _this.drawingLine = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts.push(pt)
        }
        else {
          _this.drawing = false
        }
      });

      _defineProperty(this, "addVertex", function (event) {
        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
          _this.drawingLine.addPoint(pt);
          _this.drawingLinePts.push(pt)
        }
      });
      _defineProperty(this, "endflatDraw", function (event) {
        _this.height = true
        if (_this.drawingLinePts.length > 2) {
          var points = _this.drawingLinePts


          points.push(points[0])

          let volume1 = {
            color: 0xf18100,
            opacity: 0.3,
            points: points.map(function (lnglat) {
              return new altizure.LngLatAlt(lnglat.lng, lnglat.lat, 0)
            }),
            top: 10,
            bottom: 0.1,
          }
          _this.polygon1 = new altizure.PolygonMarker({
            volume: volume1,
            sandbox: sandbox,
            name: 'polygon1',
            interactable: true
          })
        }
        if (_this.drawingLine) {
          _this.drawingLine.destruct();
          _this.drawingLine = undefined;
        }
        if (_this.drawingLine_2) {
          _this.drawingLine_2.destruct();
          _this.drawingLine_2 = undefined;
        }
        _this.polygonstore = _this.polygon1

        this.startpoint = event
        console.log(this.startpoint)
      });



      _defineProperty(this, "endDraw", function (event) {
        console.log(1111)
        _this.drawing = false
        _this.height = false
        if (_this.drawingLinePts.length > 2) {
          var points = _this.drawingLinePts

          var x = 0
          var y = 0
          var z = 0
          points.map(point => {
            x = x + point.lng
            y = y + point.lat
            z = z + point.alt
          })
          var ptcenter = { lng: x / _this.drawingLinePts.length, lat: y / _this.drawingLinePts.length, alt: _this.polygon1.top }

          points.push(points[0])


          let measureInfo = altmarker.getRegionVolume(_this.polygon1, _this.polygon1.top)

          let textTag2 = new altizure.TextTagMarker({
            text: "填方：" + measureInfo.fill.toFixed(2) + " 立方米",
            textStyle: {
              fillStyle: 'white',
              font: 'normal 500 40px Arial',
              margin: 5,
              outlineWidth: 2,
              outlineStyle: 'rgb(0, 0, 0)'
            },
            position: ptcenter,
            sandbox: sandbox,
            scale: 0.7
          })
          markerlist.push(textTag2)
          markerlist.push(_this.polygon1)
        }
        _this.polygonstore = undefined
        _this.startpoint = undefined
        _this.drawingLinePts = [];
        _this.enabled = false;
      });
      this.sandbox = props.sandbox;
      this.altmarker = props.altmarker;
      this.enabled = false;
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mouseup', this.handleMouseUp);
      document.addEventListener('mousemove', this.handleMouseMove);
      this.lastDownEvent = undefined;
      this.drawing = false;
      this.drawingLine = undefined;
      this.drawingLinePts = [];
      this.drawingLine_2 = undefined;
      this.drawingLinePts_2 = [];
      this.lineCollection = [];
      this.drawingTextTag = undefined; // this.drawingTextTagCollection = []
      this.polygon1 = undefined
      this.height = false
      this.startpoint = undefined
      this.polygonstore = undefined

      this.textCollection = [];
      this.defaultOption = {
        name: 'pl2',
        sandbox: this.sandbox,
        color: 'white',
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

    _createClass(VolumeMeasure, [{
      key: "start",
      value: function start() {
        this.enabled = true;
      }
    },
    {
      key: "stop",
      value: function stop() {
        this.enabled = false
        this.drawing = false
        this.height = false
        this.startpoint = undefined
        if (this.drawingLine) {
          this.drawingLine.destruct();
          this.drawingLine = undefined;
        }
        if (this.drawingLine_2) {
          this.drawingLine_2.destruct();
          this.drawingLine_2 = undefined;
        }
        if (this.polygonstore) {
          this.polygonstore.destruct()
          this.polygonstore = undefined
        }
        this.drawingLinePts = []

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

    return VolumeMeasure;
  }();


var GroundAreameasure =
  /*#__PURE__*/
  function () {
    function GroundAreameasure(props) {
      var _this = this;

      _classCallCheck(this, GroundAreameasure);

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
          if (pt != undefined) {
            _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
            _this.drawingLine_2.setPoint(0, _this.drawingLinePts[0]);
            _this.drawingLine_2.setPoint(1, pt);
          }
        }
      });

      _defineProperty(this, "startDraw", function (event) {
        _this.drawing = true;

        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          var points = [pt, pt];
          var option = Object.assign(_this.defaultOption, {
            points: points
          });
          _this.drawingLine_2 = new altizure.PolyCylinderLineMarker({
            name: 'pl1',
            sandbox: sandbox,
            points: [pt, pt],
            color: 'white',
            lineWidth: 0.3
          })
          _this.drawingLine = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts.push(pt)
        }
        else {
          _this.drawing = false
        }
      });

      _defineProperty(this, "addVertex", function (event) {
        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
          _this.drawingLine.addPoint(pt);
          _this.drawingLinePts.push(pt)
        }
      });

      _defineProperty(this, "endDraw", function (event) {
        _this.drawing = false
        if (_this.drawingLinePts.length > 2) {
          var points = _this.drawingLinePts

          var x = 0
          var y = 0
          var z = 0
          points.map(point => {
            x = x + point.lng
            y = y + point.lat
            z = z + point.alt
          })
          var ptcenter = { lng: x / _this.drawingLinePts.length, lat: y / _this.drawingLinePts.length, alt: z / _this.drawingLinePts.length }
          points.push(points[0])
          let volume1 = {
            color: 0xf18100,
            opacity: 0.3,
            points: points.map(function (lnglat) {
              return new altizure.LngLatAlt(lnglat.lng, lnglat.lat, 0)
            }),
            top: 10,
            bottom: 0.1,
          }
          let polygon1 = new altizure.PolygonMarker({
            volume: volume1,
            sandbox: sandbox,
            name: 'polygon1',
            interactable: true
          })

          var promise1 = new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve('foo');
            }, 300);
          });

          promise1.then(function (value) {
            let measureInfo = altmarker.getRegionVolume(polygon1)

            let textTag2 = new altizure.TextTagMarker({
              text: "面积: " + measureInfo.area.toFixed(2) + " 平方米",
              textStyle: {
                fillStyle: 'white',
                font: 'normal 500 40px Arial',
                margin: 5,
                outlineWidth: 2,
                outlineStyle: 'rgb(0, 0, 0)'
              },
              position: ptcenter,
              sandbox: sandbox,
              scale: 0.7
            })
            markerlist.push(textTag2)
          });
          markerlist.push(polygon1)
        }
        if (_this.drawingLine) {
          _this.drawingLine.destruct();
          _this.drawingLine = undefined;
        }
        if (_this.drawingLine_2) {
          _this.drawingLine_2.destruct();
          _this.drawingLine_2 = undefined;
        }
        _this.drawingLinePts = [];
        _this.enabled = false;
      });

      this.sandbox = props.sandbox;
      this.altmarker = props.altmarker;
      this.enabled = false;
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mouseup', this.handleMouseUp);
      document.addEventListener('mousemove', this.handleMouseMove);
      this.lastDownEvent = undefined;
      this.drawing = false;

      this.drawingLine = undefined;
      this.drawingLinePts = [];
      this.drawingLine_2 = undefined;
      this.drawingLinePts_2 = [];
      this.lineCollection = [];
      this.drawingTextTag = undefined; // this.drawingTextTagCollection = []

      this.textCollection = [];
      this.defaultOption = {
        name: 'pl2',
        sandbox: this.sandbox,
        color: 'white',
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

    _createClass(GroundAreameasure, [{
      key: "start",
      value: function start() {
        this.enabled = true;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.enabled = false;
        this.drawing = false
        if (this.drawingLine) {
          this.drawingLine.destruct();
          this.drawingLine = undefined;
        }
        if (this.drawingLine_2) {
          this.drawingLine_2.destruct();
          this.drawingLine_2 = undefined;
        }
        this.drawingLinePts = [];
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

    return GroundAreameasure;
  }();


var SurfaceAreameasure =
  /*#__PURE__*/
  function () {
    function SurfaceAreameasure(props) {
      var _this = this;

      _classCallCheck(this, SurfaceAreameasure);

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
          if (pt != undefined) {
            _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
            _this.drawingLine_2.setPoint(0, _this.drawingLinePts[0]);
            _this.drawingLine_2.setPoint(1, pt);
          }
        }
      });

      _defineProperty(this, "startDraw", function (event) {
        _this.drawing = true;

        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          var points = [pt, pt];
          var option = Object.assign(_this.defaultOption, {
            points: points
          });
          _this.drawingLine_2 = new altizure.PolyCylinderLineMarker({
            name: 'pl1',
            sandbox: sandbox,
            points: [pt, pt],
            color: 'white',
            lineWidth: 0.3
          })
          _this.drawingLine = new altizure.PolyCylinderLineMarker(option);
          _this.drawingLinePts.push(pt)
        }
        else {
          _this.drawing = false
        }
      });

      _defineProperty(this, "addVertex", function (event) {
        var pt = _this.sandbox.pickOnProjects(event);
        if (pt != undefined) {
          _this.drawingLine.setPoint(_this.drawingLine.pointsNumber - 1, pt);
          _this.drawingLine.addPoint(pt);
          _this.drawingLinePts.push(pt)
        }
      });

      _defineProperty(this, "endDraw", function (event) {
        _this.drawing = false
        if (_this.drawingLinePts.length > 2) {
          var points = _this.drawingLinePts

          var x = 0
          var y = 0
          var z = 0
          points.map(point => {
            x = x + point.lng
            y = y + point.lat
            z = z + point.alt
          })
          var ptcenter = { lng: x / _this.drawingLinePts.length, lat: y / _this.drawingLinePts.length, alt: z / _this.drawingLinePts.length }
          points.push(points[0])
          let pts1 = points.map(function (lnglat) {
            return new altizure.LngLatAlt(lnglat.lng, lnglat.lat, lnglat.alt)
          })
          let planar1 = new altizure.PlanarPatchMarker({
            sandbox: sandbox,
            points: pts1,
            offset: 0.5, // offset along normal
            // color: 0x6565C3, // color
            // opacity: 1.0, // opacity
            color: 0xf18100,
            opacity: 0.5,
            wireframe: false,
            showNormal: false
          })
          let textTag2 = new altizure.TextTagMarker({
            text: "面积: " + planar1.area.toFixed(2) + " 平方米",
            textStyle: {
              fillStyle: 'white',
              font: 'normal 500 40px Arial',
              margin: 5,
              outlineWidth: 2,
              outlineStyle: 'rgb(0, 0, 0)'
            },
            position: ptcenter,
            sandbox: sandbox,
            scale: 0.7
          })
          markerlist.push(textTag2)
          markerlist.push(planar1)
        }
        if (_this.drawingLine) {
          _this.drawingLine.destruct();
          _this.drawingLine = undefined;
        }
        if (_this.drawingLine_2) {
          _this.drawingLine_2.destruct();
          _this.drawingLine_2 = undefined;
        }
        _this.drawingLinePts = [];
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
      this.drawingLine_2 = undefined;
      this.drawingLinePts_2 = [];
      this.lineCollection = [];
      this.drawingTextTag = undefined; // this.drawingTextTagCollection = []

      this.textCollection = [];
      this.defaultOption = {
        name: 'pl2',
        sandbox: this.sandbox,
        color: 'white',
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

    _createClass(SurfaceAreameasure, [{
      key: "start",
      value: function start() {
        this.enabled = true;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.enabled = false;
        this.drawing = false
        if (this.drawingLine) {
          this.drawingLine.destruct();
          this.drawingLine = undefined;
        }
        if (this.drawingLine_2) {
          this.drawingLine_2.destruct();
          this.drawingLine_2 = undefined;
        }
        this.drawingLinePts = [];
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

    return SurfaceAreameasure;
  }();

function clean() {

  markerlist.map(marker => {
    marker.destruct()
  })
  markerlist = []
}