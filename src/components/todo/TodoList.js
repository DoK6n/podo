import React from 'react';
import { TodoItem } from '@components/todo';
import { TodoListBlock } from '@styles/todo';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTodoStore } from '@hooks';

function TodoList() {
  const { todos, dragItem } = useTodoStore();

  const onDragEnd = result => {
    if (!result.destination) return;

    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;

    dragItem({ draggingItemIndex, afterDragItemIndex });
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
