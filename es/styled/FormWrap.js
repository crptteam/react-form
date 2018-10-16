(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'styled-components'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('styled-components'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.styledComponents);
    global.FormWrap = mod.exports;
  }
})(this, function (exports, _react, _styledComponents) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n  display: block;\n'], ['\n  display: block;\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var FormWrap = _styledComponents2.default.form.withConfig({
    displayName: 'FormWrap'
  })(_templateObject);

  exports.default = FormWrap;
});