import PropTypes from 'prop-types';

import { customPropTypes } from '@crpt/react-utils';

import { FormWrapper } from '../../styled';

export const FormPropTypes = {
  as: customPropTypes.as,

  getProps: PropTypes.func,

  className: PropTypes.string,
  style: PropTypes.shape({}),
  theme: PropTypes.shape({}).isRequired,
};

export const FormDefaultProps = {
  as: FormWrapper,
  theme: {},
};
