(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'react', '@storybook/react', '@storybook/addon-actions', '@storybook/addon-knobs/react', '../index', '../../../button/', '../../../input/', '../../../layout/', '../../../date-picker/', '../../../select/'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('react'), require('@storybook/react'), require('@storybook/addon-actions'), require('@storybook/addon-knobs/react'), require('../index'), require('../../../button/'), require('../../../input/'), require('../../../layout/'), require('../../../date-picker/'), require('../../../select/'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.react, global.react, global.addonActions, global.react, global.index, global.button, global.input, global.layout, global.datePicker, global.select);
    global.indexStories = mod.exports;
  }
})(this, function (module, _react, _react3, _addonActions, _react4, _index, _button, _input, _layout, _datePicker, _select) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var elements = (0, _react3.storiesOf)('Form', module);

  elements.addDecorator(_react4.withKnobs);

  elements.add('default', function () {
    return _react2.default.createElement(
      'div',
      { style: { width: "1056px" } },
      _react2.default.createElement(
        _index.Form,
        { onSubmit: function onSubmit(values) {
            return console.log("values", values);
          }, onCollapse: function onCollapse(current) {
            return console.log('current state of open:', current);
          } },
        _react2.default.createElement(
          _index.FormLine,
          null,
          _react2.default.createElement(
            _button.Button,
            { leftIcon: 'filter', action: 'collapse' },
            '\u0424\u0438\u043B\u044C\u0442\u0440'
          )
        ),
        _react2.default.createElement(
          _index.CollapsibleContent,
          null,
          _react2.default.createElement(
            _index.FormLine,
            null,
            _react2.default.createElement(_input.Input, { name: 'search', placeholder: '\u041F\u043E\u0438\u0441\u043A' })
          ),
          _react2.default.createElement(
            _index.FormLine,
            null,
            _react2.default.createElement(
              _layout.Container,
              { gutter: 10.5 },
              _react2.default.createElement(
                _layout.Column,
                null,
                _react2.default.createElement(_datePicker.RangePicker, { name: 'date', to: "2018.02.04", from: "2017.01.01" })
              ),
              _react2.default.createElement(
                _layout.Column,
                null,
                _react2.default.createElement(_select.SingleSelect, { name: 'category', placeholder: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F', values: [{ id: 1, title: "Табачная продукция" }, { id: 2, title: "Лекарства" }], selectedId: 1 })
              ),
              _react2.default.createElement(
                _layout.Column,
                null,
                _react2.default.createElement(_select.MultiSelect, { name: 'manufacturer', placeholder: '\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C', values: [{ id: 1, title: "Parliament" }, { id: 2, title: "Phazer" }, { id: 3, title: "Winston" }, { id: 4, title: "Pall Mall" }, { id: 5, title: "Malboro" }], multi: true })
              ),
              _react2.default.createElement(
                _layout.Column,
                null,
                _react2.default.createElement(_select.SingleSelect, { placeholder: '\u0422\u0435\u043C\u0430 \u043F\u0440\u0435\u0442\u0435\u043D\u0437\u0438\u0438', name: 'report-theme', values: [{ id: 1, title: "Жалоба на качество товаров" }, { id: 2, title: "Просто претензия" }] })
              )
            )
          ),
          _react2.default.createElement(
            _index.FormLine,
            null,
            _react2.default.createElement(
              _button.Button,
              { type: 'submit', marginRight: 16 },
              '\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C'
            ),
            _react2.default.createElement(
              _button.Button,
              { action: 'clear' },
              '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C'
            )
          )
        )
      )
    );
  });
});