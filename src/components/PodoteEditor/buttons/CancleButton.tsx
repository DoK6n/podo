import { useRemirrorContext } from '@remirror/react';
import { useTodoStore } from 'lib/stores';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import { editIconStyledCss } from 'styles';

const EditIcon = styled.span`
  ${editIconStyledCss}
`;

interface CancleButtonProps {
  id: string;
}
export default function Canclebutton({ id }: CancleButtonProps) {
  const { setEditableById, findItemById } = useTodoStore();
  const context = useRemirrorContext();

  const onCancleItem = () => {
    context.setContent(findItemById({ id }).content);
    setEditableById({ id });
  };

  return (
    <EditIcon onClick={onCancleItem}>
      <MdCancel />
    </EditIcon>
  );
}
