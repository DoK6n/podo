import React from 'react';
import { TodoTemplateBlock } from '@styles/todo';
import { TodoList, TodoAddItem } from '@components/todo';

function TodoTemplate() {
  return (
    <TodoTemplateBlock>
      <TodoList />
      <TodoAddItem />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
