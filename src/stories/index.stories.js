import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  select
} from '@storybook/addon-knobs/react';

import { Form, FormLine, CollapsibleContent } from '../index';
import { Button } from '../../../button/';
import { Input } from '../../../input/';
import { Container } from '../../../layout/';
import { Column } from '../../../layout/';
import { RangePicker } from '../../../date-picker/';
import { SingleSelect } from '../../../select/';
import { MultiSelect } from '../../../select/';

const elements = storiesOf('Form', module);


elements.addDecorator(withKnobs);

elements.add('default', () => {
  return (
    <div style={{ width: "1056px" }}>



      <Form onSubmit={values => console.log("values", values)} onCollapse={current => console.log('current state of open:', current)}>
        <FormLine>
          <Button leftIcon="filter" action="collapse">Фильтр</Button>
        </FormLine>
        <CollapsibleContent>
          <FormLine>
            <Input name="search" placeholder="Поиск" />
          </FormLine>
          <FormLine>
            <Container gutter={10.5}>
              <Column>
                <RangePicker name="date" to={"2018.02.04"} from={"2017.01.01"} />
              </Column>
              <Column>
                <SingleSelect name="category" placeholder="Категория" values={[{id:1, title:"Табачная продукция"}, {id:2, title: "Лекарства"}]} selectedId={1} />
              </Column>
              <Column>
                <MultiSelect name="manufacturer" placeholder="Производитель" values={[{id:1, title:"Parliament"}, {id:2, title: "Phazer"}, {id:3, title: "Winston"}, {id:4, title: "Pall Mall"}, {id:5, title: "Malboro"}]}  multi />
              </Column>
              <Column>
                <SingleSelect placeholder="Тема претензии" name="report-theme" values={[{id:1, title:"Жалоба на качество товаров"}, {id:2, title: "Просто претензия"}]}  />
              </Column>
            </Container>
          </FormLine>
          <FormLine>
            <Button type="submit" marginRight={16}>
              Применить
            </Button>
            <Button action="clear">Очистить</Button>
          </FormLine>
        </CollapsibleContent>
      </Form>
    </div>
  );
});
