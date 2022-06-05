import React from 'react';
import { PodoteEditor } from 'components';
import { TodoItemBlock, TodoListBlock, TodoTemplateBlock } from 'styles';

function PodoteEditorPage() {
  return (
    <>
      <TodoTemplateBlock>
        <TodoListBlock>
          <TodoItemBlock edited={false} done={false}>
            <PodoteEditor />
          </TodoItemBlock>
        </TodoListBlock>
      </TodoTemplateBlock>
    </>
  );
}

export default PodoteEditorPage;
