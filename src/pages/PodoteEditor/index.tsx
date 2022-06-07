import React, { useState } from 'react';
import { PodoteEditor } from 'components';
import { buttonStyledCss, todoItemBlockStyledCss, todoListBlockStyledCss, todoTemplateStyledCss } from 'styles';
import styled, { TodoStylesProps } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const TodoItemBlock = styled.section<TodoStylesProps>`
  ${todoItemBlockStyledCss}
`;

const TodoListBlock = styled.article`
  ${todoListBlockStyledCss}
`;

const TodoTemplateBlock = styled.main`
  ${todoTemplateStyledCss}
`;

const EditableButton = styled.button<TodoStylesProps>`
  ${buttonStyledCss}
  color: ${props => (props.edited ? '#48c774' : '#abb2bf')};
`;

const ViewOnlyButton = styled.button<TodoStylesProps>`
  ${buttonStyledCss}
  color: ${props => (!props.edited ? '#48c774' : '#abb2bf')};
`;

function PodoteEditorPage() {
  const [editable, setEditable] = useState<boolean>(true);
  const [testOnlyContentJSON, setTestOnlyContentJSON] = useState<any>({});
  return (
    <>
      <TodoTemplateBlock>
        <TodoItemBlock edited={false} done={false}>
          <EditableButton edited={editable} onClick={() => setEditable(true)}>
            editable
          </EditableButton>
          <ViewOnlyButton edited={editable} onClick={() => setEditable(false)}>
            view only
          </ViewOnlyButton>
        </TodoItemBlock>
        <TodoListBlock>
          <TodoItemBlock edited={false} done={false}>
            <PodoteEditor id={uuidv4()} editable={editable} setTestOnlyContentJSON={setTestOnlyContentJSON} />
            {/* <PodoteEditor editable={editable} /> */}
          </TodoItemBlock>
          <TodoItemBlock edited={false} done={false}>
            <pre style={{ padding: '2em' }}>{JSON.stringify(testOnlyContentJSON, null, 4)}</pre>
          </TodoItemBlock>
        </TodoListBlock>
      </TodoTemplateBlock>
    </>
  );
}

export default PodoteEditorPage;
