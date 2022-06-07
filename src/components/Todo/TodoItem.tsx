import React, { useState } from 'react';
import {
  checkIconStyledCss,
  dragHandleIconStyledCss,
  editIconStyledCss,
  itemBlockLeftIconWrapperStyledCss,
  itemTextStyledCss,
  removeIconStyledCss,
  todoItemBlockStyledCss,
} from 'styles';
import { PodoteEditor } from 'components';
import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';
import { IoWaterOutline, IoWaterSharp } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import { useTodoStore } from 'hooks';
import styled, { TodoStylesProps } from 'styled-components';

const TodoItemBlock = styled.section<TodoStylesProps>`
  ${todoItemBlockStyledCss}
`;

const ItemBlockLeftIconWrapper = styled.div`
  ${itemBlockLeftIconWrapperStyledCss}
`;

const DragHandleIcon = styled.span`
  ${dragHandleIconStyledCss}
`;

const CheckIcon = styled.span<TodoStylesProps>`
  ${checkIconStyledCss}
`;

const EditIcon = styled.span`
  ${editIconStyledCss}
`;

const RemoveIcon = styled.span`
  ${removeIconStyledCss}
`;

const ItemText = styled.div<TodoStylesProps>`
  ${itemTextStyledCss}
`;

interface Props {
  id: string;
  content: Object | any;
  done: boolean;
  index: number;
}

function TodoItem({ id, content, done, index }: Props) {
  const [edited, setEdited] = useState<boolean>(false);
  const { removeItem, toggleItem } = useTodoStore();

  const onRemoveitem = () => {
    removeItem({ id });
  };

  const onToggleItem = () => {
    toggleItem({ id });
  };

  const onEditItem = () => {
    setEdited(state => !state);
  };

  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {provided => (
        <TodoItemBlock edited={edited} done={done} ref={provided.innerRef} {...provided.draggableProps}>
          <ItemBlockLeftIconWrapper>
            <DragHandleIcon {...provided.dragHandleProps}>
              <MdDragIndicator />
            </DragHandleIcon>
            <CheckIcon onClick={onToggleItem} done={done}>
              {done === false ? <IoWaterOutline size={30} /> : <IoWaterSharp size={30} />}
            </CheckIcon>
          </ItemBlockLeftIconWrapper>
          <ItemText done={done}>
            <PodoteEditor id={id} editable={edited} content={content} />
          </ItemText>
          <EditIcon onClick={onEditItem}>
            <BiEdit />
          </EditIcon>
          {edited ? (
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
