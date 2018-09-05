import React, {Component} from 'react'
import {render} from 'react-dom'

import { Form, Field } from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-form Demo</h1>
      <Form onSubmit={data => console.log(data)}>
        <Field name="FieldName" defaultValue={'123'}/>
        <button type="submit">click</button>
      </Form>
      <Form onSubmit={data => console.log(data)}>
        <Field name="FieldName2" defaultValue={'1234'}/>
        <button type="submit">click</button>
      </Form>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
