import React from 'react';
import { DragHandleIcon, ItemText, RemoveIcon, TodoItemBlock } from '../../styles/todo';
import { FcEmptyTrash } from 'react-icons/fc';
import { MdDragIndicator } from 'react-icons/md';
import { useTodoDispatch } from '../../hooks/todoContext';

function TodoItem({ id, text, done }) {
  const dispatch = useTodoDispatch();
  const onRemoveitem = () => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const onToggleItem = () => {
    dispatch({ type: 'TOGGLE_ITEM', id });
  };

  return (
    <TodoItemBlock done={done}>
      <DragHandleIcon>
        <MdDragIndicator />
      </DragHandleIcon>
      <ItemText onClick={onToggleItem}>{text}</ItemText>
      <RemoveIcon onClick={onRemoveitem}>
        <FcEmptyTrash />
      </RemoveIcon>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
