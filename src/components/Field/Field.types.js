import PropTypes from 'prop-types';

import { customPropTypes } from '@crpt/react-utils';

import { FieldWrapper } from '../../styled';

export const FieldPropTypes = {
  as: customPropTypes.as,

  getProps: PropTypes.func,

  className: PropTypes.string,
  style: PropTypes.shape({}),
  theme: PropTypes.shape({}).isRequired,
};

export const FieldDefaultProps = {
  as: FieldWrapper,
  theme: {},
};
