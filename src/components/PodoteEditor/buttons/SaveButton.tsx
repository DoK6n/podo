import { useHelpers } from '@remirror/react';
import { useTodoStore } from 'lib/stores';
import { useCallback } from 'react';
import { IoMdCloudDone } from 'react-icons/io';
import styled from 'styled-components';
import { editIconStyledCss } from 'styles';

const EditIcon = styled.span`
  ${editIconStyledCss}
`;

export default function SaveButton({ id }: { id: string }) {
  const { setEditableById, editItemText } = useTodoStore();
  const { getJSON } = useHelpers();

  const handleClick = useCallback(() => {
    editItemText({ id, content: getJSON() });
    setEditableById({ id });
  }, [getJSON]);

  return (
    <EditIcon onMouseDown={event => event.preventDefault()} onClick={handleClick}>
      <IoMdCloudDone />
    </EditIcon>
  );
}
