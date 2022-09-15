import { useClientCacheTodoEditable } from 'lib/hooks';
import { BiEdit } from 'react-icons/bi';
import styled from 'styled-components';
import { editIconStyledCss } from 'styles';

const EditIcon = styled.span`
  ${editIconStyledCss}
`;

interface EditButtonProps {
  id: string;
}
export default function Editbutton({ id }: EditButtonProps) {
  const { setTodoEditable } = useClientCacheTodoEditable();

  const onEditItem = () => {
    setTodoEditable({ id });
  };

  return (
    <EditIcon onClick={onEditItem}>
      <BiEdit />
    </EditIcon>
  );
}
