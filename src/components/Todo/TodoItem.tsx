import React from 'react';
import {
  dragHandleIconStyledCss,
  itemBlockLeftIconWrapperStyledCss,
  itemTextStyledCss,
  todoItemBlockStyledCss,
} from 'styles';
import { PodoteEditor, RemoveButton, ToggleButton } from 'components';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import styled, { TodoStylesProps } from 'styled-components';
import { BsTrashFill } from 'react-icons/bs';
import { Todo } from 'podote/interfaces';

const TodoItemBlock = styled.section<TodoStylesProps>`
  ${todoItemBlockStyledCss}
`;

const ItemBlockLeftIconWrapper = styled.div`
  ${itemBlockLeftIconWrapperStyledCss}
`;

const DragHandleIcon = styled.span`
  ${dragHandleIconStyledCss}
`;

const ItemText = styled.div<TodoStylesProps>`
  ${itemTextStyledCss}
`;

interface Props extends Omit<Todo, 'removedDt'> {
  index: number;
}

function TodoItem({ id, content, done, editable, index }: Props) {
  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {provided => (
        <TodoItemBlock editable={editable} done={done} ref={provided.innerRef} {...provided.draggableProps}>
          <ItemBlockLeftIconWrapper>
            <DragHandleIcon {...provided.dragHandleProps}>
              <MdDragIndicator />
            </DragHandleIcon>
            <ToggleButton id={id} done={done} />
          </ItemBlockLeftIconWrapper>
          <ItemText done={done} editable={editable}>
            <PodoteEditor id={id} editable={editable} content={content} editorType={'TODO_ITEM'} />
          </ItemText>
          {editable ? <RemoveButton id={id} /> : null}
        </TodoItemBlock>
      )}
    </Draggable>
  );
}

export default React.memo(TodoItem);
