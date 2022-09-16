import React from 'react';
import { useMutation } from '@apollo/client';
import { RECYCLE_REMOVED_TODO } from 'lib/graphql/mutation';
import { useAuthStore } from 'lib/stores';
import { FaTrashRestore } from 'react-icons/fa';
import styled from 'styled-components';
import { removeIconStyledCss } from 'styles';
import { GET_USER_ALL_REMOVED_TODOS, GET_USER_ALL_TODOS } from 'lib/graphql/query';

const IconButtonWrapper = styled.div`
  ${removeIconStyledCss}
`;

interface RecycleButtonProps {
  id: string;
}

export default function RecycleButton({ id }: RecycleButtonProps) {
  const { currentUserInfo } = useAuthStore();
  const [recycleRemovedTodo] = useMutation(RECYCLE_REMOVED_TODO);

  // 할일 항목 복원
  const onRecycleItem = async () => {
    await recycleRemovedTodo({
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
    <IconButtonWrapper onClick={onRecycleItem}>
      <FaTrashRestore viewBox="0 -100 448 612" />
    </IconButtonWrapper>
  );
}
