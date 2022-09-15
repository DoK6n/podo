import React from 'react';
import {
  dragHandleIconStyledCss,
  itemBlockLeftIconWrapperStyledCss,
  itemTextStyledCss,
  removeIconStyledCss,
  todoItemBlockStyledCss,
} from 'styles';
import { PodoteEditor, ToggleButton } from 'components';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import styled, { TodoStylesProps } from 'styled-components';
import { RemirrorJSON } from 'remirror';
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

const RemoveIcon = styled.span`
  ${removeIconStyledCss}
`;

const ItemText = styled.div<TodoStylesProps>`
  ${itemTextStyledCss}
`;

interface Props extends Omit<Todo, 'removedDt'> {
  index: number;
}

function TodoItem({ id, content, done, editable, index }: Props) {
  // 휴지통으로 이동
  const onRemoveitem = () => {};

  // 완료 여부 토글
  const onToggleItem = () => {};

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
          {editable ? (
            <RemoveIcon onClick={onRemoveitem}>
              <BsTrashFill />
            </RemoveIcon>
          ) : null}
        </TodoItemBlock>
      )}
    </Draggable>
  );
}

export default React.memo(TodoItem);
