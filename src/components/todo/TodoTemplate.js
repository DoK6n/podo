import React from 'react';
import { TodoTemplateBlock } from '../../styles/todo';
import { TodoList, TodoAddItem } from '../todo';

function TodoTemplate() {
  return (
    <TodoTemplateBlock>
      <TodoList />
      <TodoAddItem />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
