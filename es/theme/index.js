(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './defaultTheme.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./defaultTheme.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defaultTheme);
    global.index = mod.exports;
  }
})(this, function (exports, _defaultTheme) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.defaultTheme = undefined;

  var _defaultTheme2 = _interopRequireDefault(_defaultTheme);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.defaultTheme = _defaultTheme2.default;
});