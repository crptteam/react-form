import React from 'react';

import { isEqual } from 'lodash';

import {
  getComponentProps,
  getElementType,
  getChildren,
} from '@crpt/react-utils';

import {
  FieldPropTypes,
  FieldDefaultProps,
} from './Field.types';

import { withConsumer } from '../../constants';

class Field extends React.Component {
  componentDidMount() {
    const componentProps = getComponentProps(Field, this.props);

    const children = getChildren(componentProps, {
      shorthand: ['value', 'defaultValue'],
      updateProps: false,
    });

    const { name, onFieldMount } = componentProps;
    if (name) onFieldMount(name, children);
  }

  render() {
    const componentProps = getComponentProps(Field, this.props);

    const ElementType = getElementType(componentProps);

    const { name, curryOnChange, onChange, onFieldMount, ...passProps } = componentProps;

    return (
      <ElementType
        name={name}
        {...passProps}
        onChange={curryOnChange(name, onChange)}
      />
    );
  }
}

Field.displayName = 'Field';

Field.propTypes = FieldPropTypes;

Field.defaultProps = FieldDefaultProps;

export default withConsumer(Field);
