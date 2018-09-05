import React from 'react';

import { curry, set, isArray } from 'lodash';

import {
  getComponentProps,
  getElementType,
  getChildren,
} from '@crpt/react-utils';

import {
  FormPropTypes,
  FormDefaultProps,
} from './Form.types';

import { FormContext } from '../../constants';

class Form extends React.Component {
  data = {};

  onChange = (name, callback, event) => {
    set(this.data, name, event.target.value);
    if (callback) callback(name, event);
  };

  onFieldMount = (name, value) => {
    set(this.data, name, value);
  };

  onSubmit = (e) => {
    const componentProps = getComponentProps(Form, this.props);
    const { onSubmit } = componentProps;

    e.preventDefault();
    onSubmit && onSubmit(this.data);
  };

  callbacks = {
    getOnChange: (name, callback) => curry(this.onChange)(name, callback),
    onFieldMount: this.onFieldMount,
  };


  render() {
    const componentProps = getComponentProps(Form, this.props);

    const ElementType = getElementType(componentProps);

    const children = getChildren(componentProps, {
      shorthand: ['children']
    });

    if (isArray(children)) {
      console.log(children);
    }

    return (
      <ElementType {...componentProps} onSubmit={this.onSubmit}>
        <FormContext.Provider value={this.callbacks}>
          {children}
        </FormContext.Provider>
      </ElementType>
    );

  }
}

Form.displayName = 'Form';

Form.propTypes = FormPropTypes;

Form.defaultProps = FormDefaultProps;

export default Form;
