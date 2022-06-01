import React from 'react';
import { TodoTemplateBlock } from 'styles';
import { TodoList, TodoAddItem } from 'components';

function TodoTemplate() {
  return (
    <TodoTemplateBlock>
      <TodoList />
      <TodoAddItem />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
