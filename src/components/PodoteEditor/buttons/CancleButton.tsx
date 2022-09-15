import { useRemirrorContext } from '@remirror/react';
import { useClientCacheTodoEditable } from 'lib/hooks';
import { MdCancel } from 'react-icons/md';
import { RemirrorJSON } from 'remirror';
import styled from 'styled-components';
import { editIconStyledCss } from 'styles';

const EditIcon = styled.span`
  ${editIconStyledCss}
`;

interface CancleButtonProps {
  id: string;
  content: RemirrorJSON;
}
export default function Canclebutton({ id, content }: CancleButtonProps) {
  const context = useRemirrorContext();
  const { setUnEditable } = useClientCacheTodoEditable();

  const onCancleItem = () => {
    context.setContent(content);
    setUnEditable(id);
  };

  return (
    <EditIcon onClick={onCancleItem}>
      <MdCancel />
    </EditIcon>
  );
}
