import React from 'react';
import { TodoAddItemInput } from '../../styles/todo';
import { useTodoStore } from '../../hooks';

function TodoAddItem() {
  const { addItem } = useTodoStore();

  const onAddItem = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      addItem({ text: e.target.value });
      e.target.value = '';
    }
  };

  return <TodoAddItemInput placeholder="할 일을 입력 후 엔터를 눌러요" onKeyPress={onAddItem} />;
}

export default React.memo(TodoAddItem);
