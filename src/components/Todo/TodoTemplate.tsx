import React, { useEffect, useState } from 'react';
import { todoTemplateStyledCss } from 'styles';
import { TodoList, TodoAddItem } from 'components';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from 'lib/stores';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { Todo } from 'podote/interfaces';
import { Button } from '@mui/material';

const TodoTemplateBlock = styled.main`
  ${todoTemplateStyledCss}
`;

function TodoTemplate() {
  // const { todos, fetchItems } = useTodoStore();
  // const [retrieveAllTodos] = useLazyQuery(GET_USER_ALL_TODOS);
  // const { currentUserInfo } = useAuthStore();
  // const [data, setData] = useState<Todo[]>([]);

  // const fetchData = async () => {
  //   const { data } = await retrieveAllTodos({
  //     context: {
  //       headers: {
  //         uid: currentUserInfo?.uid,
  //       },
  //     },
  //   });
  //   if (data && data.retrieveAllTodos) {
  //     const responseTodos: Todo[] = data.retrieveAllTodos.map((todo: any) => ({
  //       id: todo.id,
  //       content: todo.content,
  //       done: todo.isInactive,
  //       editable: false,
  //     }));
  //     fetchItems({ todos: responseTodos });
  //     setData(responseTodos);
  //   }
  // };

  return (
    <TodoTemplateBlock>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Button onClick={fetchData}>fetch</Button> */}
      <TodoAddItem />
      <TodoList />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
