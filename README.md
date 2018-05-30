# react-form

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# Form

Form component. Can be used to wrap Input, Select and DatePicker components.

## Usage

```javascript

import { Form } from  "@crpt/react-form";
import { DatePicker } from  "@crpt/react-datepicker";


<Form onSubmit={vals => console.log('vals', vals)}>
    <DatePicker name="date" />
</Form>

```

### Form

| PropName | Description | Example |
|---|---|---|
| onSubmit: String | Called on submit. |  `<Form onSubmit={vals => console.log('vals', vals)}>` |
| onCollapse: Function | Called on collapse. |  `<Form onCollapse={() => console.log('collapsed')}>` |
| onClear: Function | Called on clear. |  `<Form onClear={() => console.log('cleared')}>` |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
