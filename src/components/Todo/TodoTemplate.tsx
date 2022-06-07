import React from 'react';
import { todoTemplateStyledCss } from 'styles';
import { TodoList, TodoAddItem } from 'components';
import styled from 'styled-components';

const TodoTemplateBlock = styled.main`
  ${todoTemplateStyledCss}
`;

function TodoTemplate() {
  return (
    <TodoTemplateBlock>
      <TodoList />
      <TodoAddItem />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
