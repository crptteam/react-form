import React, {Component} from 'react'
import {render} from 'react-dom'
import styled from 'styled-components';
import { set } from 'lodash/fp';

import { Form, Field } from '../../src'

const FieldSet = (props) => (
  <div>
    {'CustomField'}
    <Field {...props} />
  </div>
);

const CustomField = styled.input`display: block;`;


class Demo extends Component {
  state = {
    data: {
      name: 'FormName',
      fields: [
        {
          as: styled.input`background-color: green; display: block;`,
          name: 'newName',
          defaultValue: 1,
        },
        {
          as: 'button',
          type: 'submit',
          children: 'click me',
        },
      ],
    },
    show: false,
  };

  onFirstSubmit = (data) => {
    console.log(data);
    this.setState(({ show }) => ({ show: !show }));
  };

  onSecondSubmit = (data) => {
    console.log(data);
    const newState = set('data.fields.2', { as: 'input', name: 'newName2' }, this.state);
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <h1>react-form Demo</h1>
        <div>default form</div>
        <Form onSubmit={this.onFirstSubmit}>
          <Field as={CustomField} name="FieldName" defaultValue="123" />
          {this.state.show && <Field name="showName" defaultValue="555" />}
          <FieldSet name="FieldName2" defaultValue={3} />
          <button type="submit">click</button>
        </Form>
        <hr />
        <div>scheme form</div>
        <Form
          data={this.state.data}
          onSubmit={this.onSecondSubmit}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
