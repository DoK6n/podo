import { gql, useApolloClient } from '@apollo/client';
import { Query } from 'lib/graphql/generated/graphql';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { useAuthStore } from 'lib/stores';

interface SetTodoEditableOptions {
  id: string;
}

interface ReturnType {
  setTodoEditable: ({ id }: SetTodoEditableOptions) => void;
  setEditable: (selectId: string) => void;
  setUnEditable: (selectId: string) => void;
}

/**
 *  ApolloClient의 캐시 데이터(Todo의 editable)를 직접 수정하는 훅으로 
 * `client.cache.writeFragment`로 캐시값을 수정하고, `client.cache.identify`를 이용하여 cache의 id값을 조회
 * 
 * @returns 
 * - setEditable: 넘긴 인자값(id)에 해당하는 todo의 editable을 true로 변경하는 함수
 * - setUnEditable: 넘긴 인자값(id)에 해당하는 todo의 editable을 false 변경하는 함수
 * - setTodoEditable: 넘긴 인자값(id)에 해당하는 todo는 true, 그외 나머지 todo들은 false로 변경하는 함수
 *
 * ```ts
 *  export default function Component() {
      const { setTodoEditable } = useClientCacheTodoEditable();
 *    setTodoEditable({ id });
 *
 *    return <div></div>
 *  }
 * ```
 *
 */
export const useClientCacheTodoEditable = (): ReturnType => {
  const client = useApolloClient();
  const { currentUserInfo } = useAuthStore();
  const cacheTodo = client.readQuery<Query>({
    query: GET_USER_ALL_TODOS,
  });

  const setEditable = (selectId: string) => {
    client.cache.writeFragment({
      id: client.cache.identify({ __typename: 'Todo', id: selectId, userId: currentUserInfo!.uid }),
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

  const setUnEditable = (selectId: string) => {
    client.cache.writeFragment({
      id: client.cache.identify({ __typename: 'Todo', id: selectId, userId: currentUserInfo!.uid }),
      fragment: gql`
        fragment todoEditable on Todo {
          editable
        }
      `,
      data: {
        editable: false,
      },
    });
  };

  const setTodoEditable = ({ id }: SetTodoEditableOptions) => {
    // 현재 아이템만 수정모드로 변경
    setEditable(id);

    if (!cacheTodo || !cacheTodo.retrieveAllTodos) return;

    // 위 아이템을 제외한 나머지 전부 보기모드로 변경
    const unSelectedCacheTodo = cacheTodo?.retrieveAllTodos.filter(todo => todo.id !== id);
    unSelectedCacheTodo.forEach(todo => {
      setUnEditable(todo.id);
    });
  };

  return { setTodoEditable, setEditable, setUnEditable };
};
