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
  // TODO save 버튼 클릭시만 DB에 저장할것
  const { getJSON } = useHelpers();

  const handleClick = useCallback(() => {
    editItemText({ id, content: getJSON() });
    setEditableById({ id });
    // return alert(JSON.stringify(getJSON()));
  }, [getJSON]);

  return (
    <EditIcon onMouseDown={event => event.preventDefault()} onClick={handleClick}>
      <IoMdCloudDone />
    </EditIcon>
  );
}
