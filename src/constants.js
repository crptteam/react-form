import React from 'react';
import { isEqual } from 'lodash';


export const FormContext = React.createContext();

export const withConsumer = Component => {
  return class extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
      return (
        <FormContext.Consumer>
          {({ curryOnChange, onFieldMount }) => (
            <Component
              curryOnChange={curryOnChange}
              onFieldMount={onFieldMount}
              {...this.props}
            />
          )}
        </FormContext.Consumer>
      );
    }
  };
};
