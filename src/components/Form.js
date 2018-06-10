import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { recursiveMap, recursiveForEach } from '../utils';

import FormWrap from '../styled/FormWrap';

class Form extends Component {
  form;
  compRefs;
  _tmp;

  constructor(props) {
    super(props);
    this.displayName = 'Form';

    this.state = {
      values: {},
      isOpen: this.props.isOpen || false
    };

    this._tmp = {
      values: {}
    };

    this.compRefs = {};

    this.onSubmit = this.onSubmit.bind(this);
    this.clear = this.clear.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.onRef = this.onRef.bind(this);
    this.toggleCollapsible = this.toggleCollapsible.bind(this);
  }

  componentWillMount() {
    recursiveForEach(this.props.children, child => this.regChildInTmp(child));
    this.mergeTmpWithState();
  }

  mergeTmpWithState() {
    this.setState({ values: this._tmp.values });
  }

  onInputChange(name, onChange) {
    return val => {
      this.setState({
        values: {
          ...this.state.values,
          [name]: [val]
        }
      });
      onChange && onChange(val);
    };
  }

  regChildInTmp(child) {

    if (!child.type.displayName) return;

    switch (child.type.displayName) {

      case 'Input':
        if (child.props.name) {
          this._tmp = {
            values: {
              ...this._tmp.values,
              [child.props.name]: child.props.defaultValue
                ? [child.props.defaultValue]
                : []
            }
          };
        }

        break;

      case 'SingleSelect':
        if (child.props.name) {
          this._tmp = {
            values: {
              ...this._tmp.values,
              [child.props.name]: child.props.selectedId
                  ? child.props.values &&
                    child.props.values.filter(
                      v => child.props.selectedId === v.id
                    ).map(v => Object.assign({type: 'SingleSelect'}, v))
                  : []
            }
          };
        }

        break;

      case 'MultiSelect':
        if (child.props.name) {
          this._tmp = {
            values: {
              ...this._tmp.values,
              [child.props.name]: child.props.selectedIds
                  ? child.props.values &&
                  child.props.values.filter(
                    v => ~child.props.selectedIds.indexOf(v.id)
                  ).map(v => Object.assign({type: 'MultiSelect'}, v))
                  : []
            }
          };
        }

        break;

      case 'DatePicker':
        if (child.props.name) {
          this._tmp = {
            values: {
              ...this._tmp.values,
              [child.props.name]: child.props.date ? [{ date: child.props.date, type: 'DatePicker' }] : []
            }
          };
        }

        break;

      case 'RangePicker':
        if (child.props.name) {
          this._tmp = {
            values: {
              ...this._tmp.values,
              [child.props.name]: child.props.from || child.props.to
                  ? [{ from: child.props.from, to: child.props.to, type: 'RangePicker' }]
                  : []

            }
          };
        }

        break;

    }
  }

  onSelectChange(name, multi, callback) {
    return val => {
      this.setState({
        values: {
          ...this.state.values,
          [name]: multi ? val.slice() : [val]
        }
      });

      callback ? callback(val) : null;

    };
  }

  onDatePickerChange(name, double) {
    return val => {
      this.setState({
        values: {
          ...this.state.values,
          [name]: [
            double
              ? {
                  to: val.to ? val.to.format('YYYY.MM.DD') : null,
                  from: val.from ? val.from.format('YYYY.MM.DD') : null
                }
              : { date: val.date ? val.date.format('YYYY.MM.DD') : null }
          ]
        }
      });
    };
  }

  toggleCollapsible() {

    console.log('toggle');

    this.setState({
      isOpen: !this.state.isOpen
    });

    this.props.onCollapse &&
      this.props.onCollapse({ isOpen: !this.state.isOpen });
  }

  clear() {

    const newValues = {};
    for (const key in this.compRefs) {
      this.compRefs[key].clear();
      newValues[key] = [];
    }

    this.setState({
      values: newValues
    });

    this.props.onClear && this.props.onClear();

  }

  onRef(name) {
    return component =>
      component
        ? (this.compRefs[name] = component)
        : delete this.compRefs[name];
  }

  getNewPropsByChild(child) {
    const newProps = {};

    if (!child.type.displayName) return {};

    switch (child.type.displayName) {
      case 'CollapsibleContent':
        newProps.visible = this.state.isOpen;
        break;

      case 'Button':
        if (child.props.action) {
          if (child.props.action === 'clear') {
            newProps.onClick = this.clear;
          }
          if (child.props.action === 'collapse') {
            newProps.onClick = this.toggleCollapsible;
          }
        }
        break;

      case 'Input':
        if (child.props.name) {
          newProps.onChange = this.onInputChange(
            child.props.name,
            child.props.onChange
          );
          newProps.onRef = this.onRef(child.props.name);
        }

        break;

      case 'SingleSelect':
        if (child.props.name) {
          newProps.onSelect = this.onSelectChange(child.props.name, false, child.props.onSelect);
          newProps.onRef = this.onRef(child.props.name);
        }
        break;

      case 'MultiSelect':
        if (child.props.name) {
          newProps.onSelect = this.onSelectChange(child.props.name, true, child.props.onSelect);
          newProps.onRef = this.onRef(child.props.name);
        }
        break;

      case 'DatePicker':
        if (child.props.name) {
          newProps.onChange = this.onDatePickerChange(child.props.name, false);
          newProps.onRef = this.onRef(child.props.name);
        }
        break;

      case 'RangePicker':
        if (child.props.name) {
          newProps.onChange = this.onDatePickerChange(child.props.name, true);
          newProps.onRef = this.onRef(child.props.name);
        }
        break;
    }

    return newProps;
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.values);
  }

  render() {
    const childrenWithProps = recursiveMap(this.props.children, child =>
      React.cloneElement(child, this.getNewPropsByChild(child))
    );

    return (
      <FormWrap onSubmit={this.onSubmit} innerRef={el => (this.form = el)}>
        {childrenWithProps}
      </FormWrap>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  onCollapse: PropTypes.func,
  onClear: PropTypes.func,
};

Form.defaultProps = {};

export default Form;