import React from 'react';
import { todoTemplateStyledCss } from 'styles';
import { TodoList, TodoAddItem } from 'components';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';

const TodoTemplateBlock = styled.main`
  ${todoTemplateStyledCss}
`;

function TodoTemplate() {
  return (
    <TodoTemplateBlock>
      <Toaster position="top-center" reverseOrder={false} />
      <TodoAddItem />
      <TodoList />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
