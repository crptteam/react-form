(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './components/Form', './components/FormLine', './components/CollapsibleContent'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./components/Form'), require('./components/FormLine'), require('./components/CollapsibleContent'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Form, global.FormLine, global.CollapsibleContent);
    global.index = mod.exports;
  }
})(this, function (exports, _Form, _FormLine, _CollapsibleContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CollapsibleContent = exports.FormLine = exports.Form = undefined;

  var _Form2 = _interopRequireDefault(_Form);

  var _FormLine2 = _interopRequireDefault(_FormLine);

  var _CollapsibleContent2 = _interopRequireDefault(_CollapsibleContent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Form = _Form2.default;
  exports.FormLine = _FormLine2.default;
  exports.CollapsibleContent = _CollapsibleContent2.default;
});