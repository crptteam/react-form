import React, {Component} from 'react'
import {render} from 'react-dom'
import styled from 'styled-components';
import { set } from 'lodash/fp';

import { Form, Field } from '../../src'

class Demo extends Component {
  state = {
    scheme: {
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
        }
      ]
    },
  };

  render() {
    return <div>
      <h1>react-form Demo</h1>
      <div>default form</div>
      <Form onSubmit={data => console.log(data)}>
        <Field as={styled.input`display: block;`} name="FieldName" defaultValue={'123'}/>
        <button type="submit">click</button>
      </Form>
      <hr />
      <div>scheme form</div>
      <Form scheme={this.state.scheme} onSubmit={data => {
        console.log(data);
        const newScheme = set('scheme.fields.2', { as: 'input', name: 'newName2' }, this.state);
        this.setState(newScheme);
      }} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
