import React from 'react';
import { TodoAddItemInput } from '../../styles/todo';
import { useTodoDispatch } from '../../hooks/todoContext';

function TodoAddItem() {
  const dispatch = useTodoDispatch();
  const onAddItem = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      dispatch({ type: 'ADD_ITEM', text: e.target.value });
      e.target.value = '';
    }
  };

  return <TodoAddItemInput placeholder="할 일을 입력 후 엔터를 눌러요" onKeyPress={onAddItem} />;
}

export default React.memo(TodoAddItem);
