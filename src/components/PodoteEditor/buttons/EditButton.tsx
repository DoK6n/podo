// import { useTodoStore } from 'lib/stores';
import { gql, useApolloClient } from '@apollo/client';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { useTodoEditableStore } from 'lib/stores/todo';
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
  // const { todosEditable, setEditableById } = useTodoEditableStore();
  const client = useApolloClient();

  const onEditItem = () => {
    console.log('click edit button');
    // setEditableById({ id });

    //
    client.cache.writeFragment({
      id: `Todo:${id}`,
      fragment: gql`
        fragment todoEditable on Todo {
          editable
        }
      `,
      data: {
        editable: true,
      },
    });
  };

  return (
    <EditIcon onClick={onEditItem}>
      <BiEdit />
    </EditIcon>
  );
}
