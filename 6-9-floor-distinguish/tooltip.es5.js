"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Create a tooltip widget
 * @public
 * @param {object} props
 */
var Tooltip =
/*#__PURE__*/
function () {
  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    this.tooltip = document.createElement('span');
    this.tooltip.classList.add('tooltip', 'top');
    this.tooltip.innerHTML = props.content;
    document.body.appendChild(this.tooltip);
    this.position = 'top';
  }

  _createClass(Tooltip, [{
    key: "show",
    value: function show(e) {
      // this.tooltip.innerHTML = text
      this.tooltip.style.visibility = "visible";
      document.body.style.cursor = "pointer";
      this.move(e);
    }
  }, {
    key: "move",
    value: function move(e) {
      this.positionDetect(e);

      switch (this.position) {
        case 'top':
          this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth / 2;
          this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight - 8;
          break;

        case 'left':
          this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth - 8;
          this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight / 2;
          break;

        case 'right':
          this.tooltip.style.left = e.clientX + 8;
          this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight / 2;
          break;

        case 'bottom':
          this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth / 2;
          this.tooltip.style.top = e.clientY + 8;
          break;

        case 'top_left':
          this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth - 8;
          this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight - 8;
          break;

        case 'top_right':
          this.tooltip.style.left = e.clientX + 8;
          this.tooltip.style.top = e.clientY - this.tooltip.offsetHeight - 8;
          break;

        case 'bottom_left':
          this.tooltip.style.left = e.clientX - this.tooltip.offsetWidth - 8;
          this.tooltip.style.top = e.clientY + 8;
          break;

        case 'bottom_right':
          this.tooltip.style.left = e.clientX + 8;
          this.tooltip.style.top = e.clientY + 8;
          break;
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.tooltip.style.visibility = "hidden";
      document.body.style.cursor = "default";
    }
  }, {
    key: "positionDetect",
    value: function positionDetect(e) {
      var that = this;
      var cornorHeight = this.tooltip.offsetHeight;
      var cornorWidth = this.tooltip.offsetWidth;
      var bodyHeight = document.body.offsetHeight;
      var bodyWidth = document.body.offsetWidth;
      var prePosition = this.position;

      if (e.clientX < cornorWidth && e.clientY < cornorHeight) {
        that.position = 'bottom_right';
      } else if (e.clientX > bodyWidth - cornorWidth && e.clientY < cornorHeight) {
        that.position = 'bottom_left';
      } else if (e.clientX < cornorWidth && e.clientY > bodyHeight - cornorHeight) {
        that.position = 'top_right';
      } else if (e.clientX > bodyWidth - cornorWidth && e.clientY > bodyHeight - cornorHeight) {
        that.position = 'top_left';
      } else if (e.clientY < cornorHeight) {
        that.position = 'bottom';
      } else if (e.clientX < cornorWidth) {
        that.position = 'right';
      } else if (e.clientX > bodyWidth - cornorWidth) {
        that.position = 'left';
      } else {
        that.position = 'top';
      }

      if (prePosition !== that.position) {
        this.tooltip.classList.remove('bottom_right', 'bottom_left', 'top_right', 'top_left', 'bottom', 'right', 'left', 'top');
        this.tooltip.classList.add(this.position);
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.tooltip.remove();
    }
  }]);

  return Tooltip;
}();