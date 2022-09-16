import { useMutation } from '@apollo/client';
import { Mutation, MutationEditTodoDoneArgs } from 'lib/graphql/generated/graphql';
import { EDIT_TODO_DONE } from 'lib/graphql/mutation';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { useAuthStore } from 'lib/stores';
import { IoWaterOutline, IoWaterSharp } from 'react-icons/io5';
import styled, { TodoStylesProps } from 'styled-components';
import { checkIconStyledCss } from 'styles';

const CheckIcon = styled.span<TodoStylesProps>`
  ${checkIconStyledCss}
`;

type EditTodoDoneType = Pick<Mutation, 'editTodoDone'>;

interface ToggleButtonProps {
  id: string;
  done: boolean;
}

export default function Togglebutton({ id, done }: ToggleButtonProps) {
  const { currentUserInfo } = useAuthStore();
  const [editTodoDone] = useMutation<EditTodoDoneType, MutationEditTodoDoneArgs>(EDIT_TODO_DONE);

  // 완료 여부 토글
  const onToggleItem = async () => {
    await editTodoDone({
      variables: {
        data: {
          id: id,
          done: !done,
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
  };

  return (
    <CheckIcon onClick={onToggleItem} done={done}>
      {done === false ? <IoWaterOutline size={25} /> : <IoWaterSharp size={25} />}
    </CheckIcon>
  );
}
