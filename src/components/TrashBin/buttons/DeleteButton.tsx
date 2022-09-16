import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_REMOVED_TODO } from 'lib/graphql/mutation';
import { useAuthStore } from 'lib/stores';
import styled from 'styled-components';
import { removeIconStyledCss } from 'styles';
import { FcEmptyTrash } from 'react-icons/fc';
import { GET_USER_ALL_REMOVED_TODOS, GET_USER_ALL_TODOS } from 'lib/graphql/query';

const IconButtonWrapper = styled.div`
  ${removeIconStyledCss}
`;

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { currentUserInfo } = useAuthStore();
  const [deleteRemovedTodo] = useMutation(DELETE_REMOVED_TODO);

  // 할일 항목 영구삭제
  const onDeleteItem = async () => {
    await deleteRemovedTodo({
      variables: {
        data: {
          id: id,
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

  return (
    <IconButtonWrapper onClick={onDeleteItem}>
      <FcEmptyTrash />
    </IconButtonWrapper>
  );
}
