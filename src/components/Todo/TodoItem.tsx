import React from 'react';
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
import { BiEdit } from 'react-icons/bi';
import { IoMdCloudDone } from 'react-icons/io';
import { IoWaterOutline, IoWaterSharp } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import { useTodoStore, useTodoTrashBinStore } from 'lib/stores';
import styled, { TodoStylesProps } from 'styled-components';
import { RemirrorJSON } from 'remirror';
import { BsTrashFill } from 'react-icons/bs';

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
  content: RemirrorJSON;
  done: boolean;
  editable: boolean;
  index: number;
}

function TodoItem({ id, content, done, editable, index }: Props) {
  const { removeItem, toggleItem, setEditableById, findItemById } = useTodoStore();
  const { addRemovedTodos } = useTodoTrashBinStore();

  const onRemoveitem = () => {
    addRemovedTodos({ todo: findItemById({ id }) });
    removeItem({ id });
  };

  const onToggleItem = () => {
    toggleItem({ id });
  };

  const onEditItem = () => {
    setEditableById({ id });
  };

  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {provided => (
        <TodoItemBlock editable={editable} done={done} ref={provided.innerRef} {...provided.draggableProps}>
          <ItemBlockLeftIconWrapper>
            <DragHandleIcon {...provided.dragHandleProps}>
              <MdDragIndicator />
            </DragHandleIcon>
            <CheckIcon onClick={onToggleItem} done={done}>
              {done === false ? <IoWaterOutline size={25} /> : <IoWaterSharp size={25} />}
            </CheckIcon>
          </ItemBlockLeftIconWrapper>
          <ItemText done={done} editable={editable}>
            <PodoteEditor id={id} editable={editable} content={content} editorType={'TODO_ITEM'} />
          </ItemText>
          <EditIcon onClick={onEditItem}>{editable ? <IoMdCloudDone /> : <BiEdit />}</EditIcon>
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
