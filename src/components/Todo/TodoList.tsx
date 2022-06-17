import React from 'react';
import { TodoItem } from 'components';
import { todoListBlockStyledCss } from 'styles';
import { Droppable, DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTodoStore } from 'hooks';
import styled from 'styled-components';

const TodoListBlock = styled.article`
  ${todoListBlockStyledCss}
`;

function TodoList() {
  const { todos, dragItem } = useTodoStore();

  const onDragEnd = (result: DropResult) => {
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
              <TodoItem
                id={todo.id}
                content={todo.content}
                done={todo.done}
                editable={todo.editable}
                index={index}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </TodoListBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(TodoList);
