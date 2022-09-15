import React from 'react';
import { TodoItem } from 'components';
import { todoListBlockStyledCss } from 'styles';
import { Droppable, DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAuthStore } from 'lib/stores';
import styled from 'styled-components';
import { useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { Todo } from 'podote/interfaces';
import produce from 'immer';
import { SWITCH_TODO_ORDER } from 'lib/graphql/mutation';
import { Query } from 'lib/graphql/generated/graphql';
const TodoListBlock = styled.article`
  ${todoListBlockStyledCss}
`;

interface AllTodosQuery {
  retrieveAllTodos: Todo[] | null;
}

interface TodoIdOrderKey {
  id: string;
  orderKey: number;
}
interface SwitchTodoOrderQueryInput {
  TodoIdOrderKey: TodoIdOrderKey[];
}

function TodoList() {
  const { currentUserInfo } = useAuthStore();
  const client = useApolloClient();
  const cacheTodo = client.readQuery<Query>({
    query: GET_USER_ALL_TODOS,
  });

  // 서버에서 Todos 데이터 조회
  const { loading, data } = useQuery<AllTodosQuery>(GET_USER_ALL_TODOS, {
    context: {
      headers: {
        uid: currentUserInfo?.uid,
      },
    },
  });

  const [switchTodoOrder] = useMutation<SwitchTodoOrderQueryInput>(SWITCH_TODO_ORDER);

  // 드래그 앤 드롭을 위한 이벤트 핸들러
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;

    if (!data || !data.retrieveAllTodos) return;

    const nextState = produce(data.retrieveAllTodos, draft => {
      const [draggingItem] = draft.splice(draggingItemIndex, 1); // 옮길 요소만 뺌
      draft.splice(afterDragItemIndex, 0, draggingItem); // 원하는 인덱스에 빼낸 요소 삽입
      draft.reverse().forEach((todo, i) => {
        // 배열 반전 후 orderKey 변경
        todo.orderKey = i + 1;
      });
      draft.reverse(); // 배열 재 반전
    });

    await switchTodoOrder({
      variables: {
        data: {
          TodoIdOrderKey: nextState.map(state => ({ id: state.id, orderKey: state.orderKey })),
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef}>
            {cacheTodo && cacheTodo.retrieveAllTodos
              ? cacheTodo.retrieveAllTodos.map((todo, index) => (
                  <TodoItem
                    id={todo.id}
                    content={todo.content}
                    done={todo.done}
                    editable={todo.editable}
                    orderKey={todo.orderKey}
                    index={index}
                    key={todo.id}
                  />
                ))
              : null}
            {provided.placeholder}
          </TodoListBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
