import React, { useState } from 'react';
import { PodoteEditor } from 'components';
import { TodoItemBlock, TodoListBlock, TodoTemplateBlock } from 'styles';
import styled, { css, TodoStylesProps } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const ButtonStyledCss: ReturnType<typeof css> = css`
  background: transparent;
  font-size: 1.2em;
  border: none;
  border-radius: 4px;
  padding: 4px;
  margin-left: 4px;
  margin-right: 4px;
  &:hover {
    background-color: #57448da4;
  }
  &:active {
    background-color: #57448d28;
  }
`;

const EditableButton = styled.button<TodoStylesProps>`
  ${ButtonStyledCss}
  color: ${props => (props.edited ? '#48c774' : '#abb2bf')};
`;
const ViewOnlyButton = styled.button<TodoStylesProps>`
  ${ButtonStyledCss}
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
