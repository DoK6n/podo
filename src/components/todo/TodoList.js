import React from 'react';
import { TodoItem } from '../todo';
import { TodoListBlock } from '../../styles/todo';
import { useTodoState } from '../../hooks/todoContext';

function TodoList() {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.map(todo => (
        <TodoItem id={todo.id} text={todo.text} done={todo.done} key={todo.id} />
      ))}
    </TodoListBlock>
  );
}

export default React.memo(TodoList);
