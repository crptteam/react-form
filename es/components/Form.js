(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "../utils", "../styled/FormWrap"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("../utils"), require("../styled/FormWrap"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.utils, global.FormWrap);
    global.Form = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _utils, _FormWrap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _FormWrap2 = _interopRequireDefault(_FormWrap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

      _this.displayName = "Form";

      _this.state = {
        values: {},
        isOpen: _this.props.isOpen || false
      };

      _this._tmp = {
        values: {}
      };

      _this.compRefs = {};

      _this.onSubmit = _this.onSubmit.bind(_this);
      _this.clear = _this.clear.bind(_this);
      _this.onInputChange = _this.onInputChange.bind(_this);
      _this.onSelectChange = _this.onSelectChange.bind(_this);
      _this.onDatePickerChange = _this.onDatePickerChange.bind(_this);
      _this.onRef = _this.onRef.bind(_this);
      _this.toggleCollapsible = _this.toggleCollapsible.bind(_this);
      return _this;
    }

    _createClass(Form, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        (0, _utils.recursiveForEach)(this.props.children, function (child) {
          return _this2.regChildInTmp(child);
        });
        this.mergeTmpWithState();
      }
    }, {
      key: "mergeTmpWithState",
      value: function mergeTmpWithState() {
        this.setState({ values: this._tmp.values });
      }
    }, {
      key: "onInputChange",
      value: function onInputChange(name, onChange) {
        var _this3 = this;

        return function (val) {
          _this3.setState({
            values: _extends({}, _this3.state.values, _defineProperty({}, name, [val]))
          });
          onChange && onChange(val);
        };
      }
    }, {
      key: "regChildInTmp",
      value: function regChildInTmp(child) {
        if (!child.type.displayName) return;

        switch (child.type.displayName) {

          case "MRPFromToSelect":
            this._tmp = {
              values: _extends({}, this._tmp.values, {
                mrpFrom: [],
                mrpTo: []
              })
            };
            break;

          case "Input":
          case "WithTheme(Input)":
            if (child.props.name) {
              this._tmp = {
                values: _extends({}, this._tmp.values, _defineProperty({}, child.props.name, child.props.defaultValue ? [child.props.defaultValue] : []))
              };
            }

            break;

          case "SingleSelect":
          case "WithTheme(SingleSelect)":
            if (child.props.name) {
              this._tmp = {
                values: _extends({}, this._tmp.values, _defineProperty({}, child.props.name, child.props.selectedId ? child.props.values && child.props.values.filter(function (v) {
                  return child.props.selectedId === v.id;
                }).map(function (v) {
                  return Object.assign({ _type: "SingleSelect" }, v);
                }) : []))
              };
            }

            break;

          case "MultiSelect":
          case "WithTheme(MultiSelect)":
            if (child.props.name) {
              this._tmp = {
                values: _extends({}, this._tmp.values, _defineProperty({}, child.props.name, child.props.selectedIds ? child.props.values && child.props.values.filter(function (v) {
                  return ~child.props.selectedIds.indexOf(v.id);
                }).map(function (v) {
                  return Object.assign({ _type: "MultiSelect" }, v);
                }) : []))
              };
            }

            break;

          case "DatePicker":
          case "WithTheme(DatePicker)":
            if (child.props.name) {
              this._tmp = {
                values: _extends({}, this._tmp.values, _defineProperty({}, child.props.name, child.props.date ? [{ date: child.props.date, _type: "DatePicker" }] : []))
              };
            }

            break;

          case "RangePicker":
          case "WithTheme(RangePicker)":
            if (child.props.name) {
              this._tmp = {
                values: _extends({}, this._tmp.values, _defineProperty({}, child.props.name, child.props.from || child.props.to ? [{
                  from: child.props.from,
                  to: child.props.to,
                  _type: "RangePicker"
                }] : []))
              };
            }

            break;
        }
      }
    }, {
      key: "onSelectChange",
      value: function onSelectChange(name, multi, callback) {
        var _this4 = this;

        return function (val) {
          _this4.setState({
            values: _extends({}, _this4.state.values, _defineProperty({}, name, multi ? val.slice().map(function (v) {
              return Object.assign({ _type: "MultiSelect" }, v);
            }) : [Object.assign({ _type: "SingleSelect" }, val)]))
          });

          callback ? callback(val) : null;
        };
      }
    }, {
      key: "onDatePickerChange",
      value: function onDatePickerChange(name, double) {
        var _this5 = this;

        return function (val) {
          _this5.setState({
            values: _extends({}, _this5.state.values, _defineProperty({}, name, [double ? {
              to: val.to ? val.to.format("YYYY.MM.DD") : null,
              from: val.from ? val.from.format("YYYY.MM.DD") : null,
              _type: "RangePicker"
            } : {
              date: val.date ? val.date.format("YYYY.MM.DD") : null,
              _type: "DatePicker"
            }]))
          });
        };
      }
    }, {
      key: "toggleCollapsible",
      value: function toggleCollapsible() {
        console.log("toggle");

        this.setState({
          isOpen: !this.state.isOpen
        });

        this.props.onCollapse && this.props.onCollapse({ isOpen: !this.state.isOpen });
      }
    }, {
      key: "clear",
      value: function clear() {
        var newValues = {};
        for (var key in this.compRefs) {
          this.compRefs[key].clear();
          newValues[key] = [];
        }

        this.setState({
          values: newValues
        });

        this.props.onClear && this.props.onClear();
      }
    }, {
      key: "onRef",
      value: function onRef(name) {
        var _this6 = this;

        return function (component) {
          return component ? _this6.compRefs[name] = component : delete _this6.compRefs[name];
        };
      }
    }, {
      key: "getNewPropsByChild",
      value: function getNewPropsByChild(child) {
        var newProps = {};

        if (child.type.displayName === "MRPFromToSelect") {
          console.log("CHILD", child, child.props.children, child.type.displayName);
        }

        if (!child.type.displayName) return newProps;

        switch (child.type.displayName) {
          case "MRPFromToSelect":
            newProps.onMrpFromChange = this.onInputChange("mrpFrom");
            newProps.onMrpFromRef = this.onRef("mrpFrom");
            newProps.onMrpToChange = this.onInputChange("mrpTo");
            newProps.onMrpToRef = this.onRef("mrpTo");
            break;

          case "CollapsibleContent":
          case "WithTheme(CollapsibleContent)":
            newProps.visible = this.state.isOpen;
            break;

          case "Button":
          case "WithTheme(Button)":
            if (child.props.action) {
              if (child.props.action === "clear") {
                newProps.onClick = this.clear;
              }
              if (child.props.action === "collapse") {
                newProps.onClick = this.toggleCollapsible;
              }
            }
            break;

          case "Input":
          case "WithTheme(Input)":
            //console.log('child.props input', child.props);
            if (child.props.name) {
              newProps.onChange = this.onInputChange(child.props.name, child.props.onChange);
              newProps.onRef = this.onRef(child.props.name);
            }

            break;

          case "SingleSelect":
          case "WithTheme(SingleSelect)":
            if (child.props.name) {
              newProps.onSelect = this.onSelectChange(child.props.name, false, child.props.onSelect);
              newProps.onRef = this.onRef(child.props.name);
            }
            break;

          case "MultiSelect":
          case "WithTheme(MultiSelect)":
            if (child.props.name) {
              newProps.onSelect = this.onSelectChange(child.props.name, true, child.props.onSelect);
              newProps.onRef = this.onRef(child.props.name);
            }
            break;

          case "DatePicker":
          case "WithTheme(DatePicker)":
            if (child.props.name) {
              newProps.onChange = this.onDatePickerChange(child.props.name, false);
              newProps.onRef = this.onRef(child.props.name);
            }
            break;

          case "RangePicker":
          case "WithTheme(RangePicker)":
            if (child.props.name) {
              newProps.onChange = this.onDatePickerChange(child.props.name, true);
              newProps.onRef = this.onRef(child.props.name);
            }
            break;
        }

        return newProps;
      }
    }, {
      key: "onSubmit",
      value: function onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit && this.props.onSubmit(this.state.values);
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        var childrenWithProps = (0, _utils.recursiveMap)(this.props.children, function (child) {
          return _react2.default.cloneElement(child, _this7.getNewPropsByChild(child));
        });

        return _react2.default.createElement(
          _FormWrap2.default,
          {
            onSubmit: this.onSubmit,
            innerRef: function innerRef(el) {
              _this7.form = el;
            }
          },
          childrenWithProps
        );
      }
    }]);

    return Form;
  }(_react.Component);

  Form.propTypes = undefined !== "production" ? {
    className: _propTypes2.default.string,
    onSubmit: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onClear: _propTypes2.default.func
  } : {};

  Form.defaultProps = {};

  exports.default = Form;
});