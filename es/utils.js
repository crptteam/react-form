(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.utils = mod.exports;
  }
})(this, function (exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.recursiveMap = recursiveMap;
  exports.recursiveForEach = recursiveForEach;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function recursiveMap(children, fn) {
    return _react2.default.Children.map(children, function (child) {
      if (!_react2.default.isValidElement(child)) {
        return child;
      }

      if (child.props.children) {
        child = _react2.default.cloneElement(child, {
          children: recursiveMap(child.props.children, fn)
        });
      }

      return fn(child);
    });
  }

  function recursiveForEach(children, fn) {
    return _react2.default.Children.forEach(children, function (child) {

      if (!_react2.default.isValidElement(child)) {
        return;
      }

      if (child.props.children) {
        recursiveForEach(child.props.children, fn);
      }

      return fn(child);
    });
  }
});