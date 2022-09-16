import { useMutation } from '@apollo/client';
import { Mutation, MutationRemoveTodoArgs } from 'lib/graphql/generated/graphql';
import { REMOVE_TODO } from 'lib/graphql/mutation';
import { GET_USER_ALL_REMOVED_TODOS, GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { useAuthStore } from 'lib/stores';
import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import styled from 'styled-components';
import { removeIconStyledCss } from 'styles';

const RemoveIcon = styled.span`
  ${removeIconStyledCss}
`;

type RemoveTodo = Pick<Mutation, 'removeTodo'>;

interface RemoveButtonProps {
  id: string;
}

export default function RemoveButton({ id }: RemoveButtonProps) {
  const [removeTodo] = useMutation<RemoveTodo, MutationRemoveTodoArgs>(REMOVE_TODO);
  const { currentUserInfo } = useAuthStore();
  // 휴지통으로 이동
  const onRemoveitem = async () => {
    await removeTodo({
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
    <RemoveIcon onClick={onRemoveitem}>
      <BsTrashFill />
    </RemoveIcon>
  );
}
