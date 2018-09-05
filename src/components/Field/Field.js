import React from 'react';

import {
  getComponentProps,
  getElementType,
  getChildren,
} from '@crpt/react-utils';

import {
  FieldPropTypes,
  FieldDefaultProps,
} from './Field.types';

import { FormContext } from '../../constants';

class Field extends React.Component {
  componentDidMount() {
    const componentProps = getComponentProps(Field, this.props);

    const children = getChildren(componentProps, {
      shorthand: ['value', 'defaultValue'],
      updateProps: false,
    });

    const { name, onFieldMount } = componentProps;
    onFieldMount(name, children);
  }

  render() {
    const componentProps = getComponentProps(Field, this.props);

    const ElementType = getElementType(componentProps);

    const { name, getOnChange, onChange } = componentProps;

    return (
        <ElementType
          {...componentProps}
          onChange={getOnChange(name, onChange)}
        />
    );
  }
}

Field.displayName = 'Field';

Field.propTypes = FieldPropTypes;

Field.defaultProps = FieldDefaultProps;

export default React.forwardRef((props, ref) => (
  <FormContext.Consumer>
    {({getOnChange, onFieldMount}) => (
      <Field
        getOnChange={getOnChange}
        onFieldMount={onFieldMount}
        {...props}
        ref={ref}
      />
    )}
  </FormContext.Consumer>
));
