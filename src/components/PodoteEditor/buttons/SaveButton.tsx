import { useMutation } from '@apollo/client';
import { useHelpers } from '@remirror/react';
import { EDIT_TODO_CONTENT } from 'lib/graphql/mutation';
import { useAuthStore } from 'lib/stores';
import { useCallback } from 'react';
import { IoMdCloudDone } from 'react-icons/io';
import styled from 'styled-components';
import { editIconStyledCss } from 'styles';
import { Mutation, MutationEditTodoContentArgs } from 'lib/graphql/generated/graphql';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';

const SaveIcon = styled.span`
  ${editIconStyledCss}
`;

export default function SaveButton({ id }: { id: string }) {
  const { currentUserInfo } = useAuthStore();
  const [editTodoContent] = useMutation<Pick<Mutation, 'editTodoContent'>, MutationEditTodoContentArgs>(
    EDIT_TODO_CONTENT,
  );
  const { getJSON } = useHelpers();
  const handleClick = useCallback(async () => {
    await editTodoContent({
      variables: {
        data: {
          id: id,
          content: getJSON(),
        },
      },
      context: {
        headers: {
          uid: currentUserInfo?.uid,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_ALL_TODOS,
          context: {
            headers: {
              uid: currentUserInfo?.uid,
            },
          },
        },
      ],
    });
  }, [getJSON]);

  return (
    <SaveIcon onClick={handleClick}>
      <IoMdCloudDone />
    </SaveIcon>
  );
}
