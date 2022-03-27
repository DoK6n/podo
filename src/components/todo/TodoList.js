import React from 'react';
import { TodoItem } from '../todo';
import { TodoListBlock } from '../../styles/todo';
import { useTodoDispatch, useTodoState } from '../../hooks/todoContext';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

function TodoList() {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();

  const onDragEnd = result => {
    if (!result.destination) return;

    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;

    dispatch({ type: 'DRAG_ITEM', draggingItemIndex, afterDragItemIndex });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <TodoItem id={todo.id} text={todo.text} done={todo.done} index={index} key={todo.id} />
            ))}
            {provided.placeholder}
          </TodoListBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(TodoList);
