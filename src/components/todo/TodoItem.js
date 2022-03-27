import React from 'react';
import { DragHandleIcon, ItemText, RemoveIcon, TodoItemBlock } from '../../styles/todo';
import { FcEmptyTrash } from 'react-icons/fc';
import { MdDragIndicator } from 'react-icons/md';
import { useTodoDispatch } from '../../hooks/todoContext';
import { Draggable } from 'react-beautiful-dnd';

function TodoItem({ id, text, done, index }) {
  const dispatch = useTodoDispatch();
  const onRemoveitem = () => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const onToggleItem = () => {
    dispatch({ type: 'TOGGLE_ITEM', id });
  };

  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {provided => (
        <TodoItemBlock done={done} ref={provided.innerRef} {...provided.draggableProps}>
          <DragHandleIcon {...provided.dragHandleProps}>
            <MdDragIndicator />
          </DragHandleIcon>
          <ItemText onClick={onToggleItem}>{text}</ItemText>
          <RemoveIcon onClick={onRemoveitem}>
            <FcEmptyTrash />
          </RemoveIcon>
        </TodoItemBlock>
      )}
    </Draggable>
  );
}

export default React.memo(TodoItem);
