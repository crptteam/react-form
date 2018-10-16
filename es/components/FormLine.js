(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'styled-components'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('styled-components'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.styledComponents);
    global.FormLine = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _styledComponents) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n  js-display: flex;\n  display: flex;\n  margin-bottom: 24px;\n  align-items: flex-start;\n  width: 100%;\n  justify-content: stretch;\n'], ['\n  js-display: flex;\n  display: flex;\n  margin-bottom: 24px;\n  align-items: flex-start;\n  width: 100%;\n  justify-content: stretch;\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var FormLine = _styledComponents2.default.div.withConfig({
    displayName: 'FormLine'
  })(_templateObject);

  FormLine.displayName = 'FormLine';

  exports.default = FormLine;
});