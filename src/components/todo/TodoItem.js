import React, { useState } from 'react';
import { CheckIcon, EditIcon, ItemText, RemoveIcon, TodoItemBlock } from '../../styles/todo';
import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';
import { IoWaterOutline, IoWaterSharp } from 'react-icons/io5';

import { useTodoDispatch } from '../../hooks/todoContext';
import { Draggable } from 'react-beautiful-dnd';

function TodoItem({ id, text, done, index }) {
  const [edited, setEdited] = useState(false);

  const dispatch = useTodoDispatch();
  const onRemoveitem = () => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const onToggleItem = () => {
    dispatch({ type: 'TOGGLE_ITEM', id });
  };

  const onEditItem = () => {
    setEdited(state => !state);
  };

  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {provided => (
        <TodoItemBlock done={done} ref={provided.innerRef} {...provided.draggableProps}>
          <CheckIcon onClick={onToggleItem} done={done}>
            {done === false ? <IoWaterOutline size={30} /> : <IoWaterSharp size={30} />}
          </CheckIcon>
          <ItemText {...provided.dragHandleProps}>{text}</ItemText>
          <EditIcon onClick={onEditItem}>
            <BiEdit />
          </EditIcon>
          {edited === true ? (
            <RemoveIcon onClick={onRemoveitem}>
              <FcEmptyTrash />
            </RemoveIcon>
          ) : null}
        </TodoItemBlock>
      )}
    </Draggable>
  );
}

export default React.memo(TodoItem);
