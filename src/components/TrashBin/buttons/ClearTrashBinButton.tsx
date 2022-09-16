import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_ALL_REMOVED_TODOS } from 'lib/graphql/mutation';
import { GET_USER_ALL_REMOVED_TODOS, GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { useAuthStore } from 'lib/stores';
import styled from 'styled-components';
import { buttonStyledCss } from 'styles';

const Button = styled.button`
  ${buttonStyledCss}
  color: #abb2bf;
`;

export default function ClearTrashBinButton() {
  const { currentUserInfo } = useAuthStore();
  const [deleteAllRemovedTodos] = useMutation(DELETE_ALL_REMOVED_TODOS);

  const onClearTrashBin = async () => {
    await deleteAllRemovedTodos({
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
        {
          query: GET_USER_ALL_REMOVED_TODOS,
          context: {
            headers: {
              uid: currentUserInfo?.uid,
            },
          },
        },
      ],
    });
  };

  return <Button onClick={onClearTrashBin}>휴지통 비우기</Button>;
}
