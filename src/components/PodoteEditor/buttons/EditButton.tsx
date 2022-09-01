import { useTodoStore } from 'lib/stores';
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
  const { setEditableById } = useTodoStore();

  const onEditItem = () => {
    setEditableById({ id });
  };

  return (
    <EditIcon onClick={onEditItem}>
      <BiEdit />
    </EditIcon>
  );
}
