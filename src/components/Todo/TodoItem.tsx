import React, { useCallback, useState } from 'react';
import {
  ItemBlockLeftIconWrapper,
  DragHandleIcon,
  CheckIcon,
  EditIcon,
  ItemText,
  RemoveIcon,
  TodoItemBlock,
} from 'styles';
import { MarkdownViewer, MarkdownEditor } from 'components';
import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';
import { IoWaterOutline, IoWaterSharp } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import { useTodoStore } from 'hooks';

interface Props {
  id: string;
  text: string;
  done: boolean;
  index: number;
}

function TodoItem({ id, text, done, index }: Props) {
  const [edited, setEdited] = useState<boolean>(false);
  const { removeItem, toggleItem, editItemText } = useTodoStore();

  const onRemoveitem = () => {
    removeItem({ id });
  };

  const onToggleItem = () => {
    toggleItem({ id });
  };

  const onEditItem = () => {
    setEdited(state => !state);
  };

  const handleDocChange = useCallback((newDoc: string, id: string, done: boolean) => {
    editItemText({ id, text: newDoc });
  }, []);

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
          <ItemText edited={edited}>
            <MarkdownEditor onChange={handleDocChange} id={id} text={text} done={done} />
          </ItemText>
          <MarkdownViewer doc={text} done={done} edited={edited} />
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
