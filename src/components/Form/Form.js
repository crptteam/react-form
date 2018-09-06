import React from 'react';

import { curry, set, isArray, map, isEqual } from 'lodash';

import {
  getComponentProps,
  getElementType,
  getChildren,
  getPropWith,
} from '@crpt/react-utils';

import {
  FormPropTypes,
  FormDefaultProps,
} from './Form.types';

import { Field } from '../index';
import { FormContext } from '../../constants';

class Form extends React.Component {
  data = {};

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props));
  }

  onChange = (name, callback, event) => {
    if (name) set(this.data, name, event.target.value);
    if (callback) callback(name, event);
  };

  onFieldMount = (name, value) => {
    set(this.data, name, value);
  };

  onSubmit = (e) => {
    const componentProps = getComponentProps(Form, this.props);
    const { onSubmit } = componentProps;

    e.preventDefault();
    if (onSubmit) onSubmit(this.data);
  };

  callbacks = {
    curryOnChange: (name, callback) => curry(this.onChange, 3)(name, callback),
    onFieldMount: this.onFieldMount,
  };

  render() {
    const componentProps = getComponentProps(Form, this.props);

    const ElementType = getElementType(componentProps);

    let children = null;

    const data = getPropWith(componentProps, 'data');

    if (data) {
      children = map(data.fields, props => <Field {...props} />);
    } else {
      children = getChildren(componentProps, { updateProps: false });
    }

    const preparedChildren = isArray(children)
      ? map(children, (item, index) => {
        const key = item.key ? item.key : item.props.name;
        return React.cloneElement(item, { key: key || index });
      })
      : children;

    return (
      <ElementType {...componentProps} onSubmit={this.onSubmit}>
        <FormContext.Provider value={this.callbacks}>
          {preparedChildren}
        </FormContext.Provider>
      </ElementType>
    );
  }
}

Form.displayName = 'Form';

Form.propTypes = FormPropTypes;

Form.defaultProps = FormDefaultProps;

export default Form;
