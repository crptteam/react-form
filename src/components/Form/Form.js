import React from 'react';

import { curry, set, isArray, map } from 'lodash';

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
    onSubmit && onSubmit(this.data);
  };

  callbacks = {
    getOnChange: (name, callback) => curry(this.onChange)(name, callback),
    onFieldMount: this.onFieldMount,
  };


  render() {
    const componentProps = getComponentProps(Form, this.props);

    const ElementType = getElementType(componentProps);

    const scheme = getPropWith(componentProps, 'scheme');

    let children = getChildren(componentProps);

    if (scheme) {
      children = map(scheme.fields, (props) => <Field {...props} />);
    }

    const preparedChildren = isArray(children)
      ? map(children, (item, index) => React.cloneElement(item, { key: item.key ? item.key : index }))
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
