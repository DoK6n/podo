import React, { useState } from 'react';
import { PodoteEditor } from 'components';
import { buttonStyledCss, todoItemBlockStyledCss, todoListBlockStyledCss, todoTemplateStyledCss } from 'styles';
import styled, { TodoStylesProps } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { RemirrorJSON } from 'remirror';

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
  color: ${props => (props.editable ? '#48c774' : '#abb2bf')};
`;

const ViewOnlyButton = styled.button<TodoStylesProps>`
  ${buttonStyledCss}
  color: ${props => (!props.editable ? '#48c774' : '#abb2bf')};
`;

const imageSrc = 'https://dummyimage.com/2000x800/479e0c/fafafa';
const proxySrc = `https://deelay.me/${1 * 1000}/${imageSrc}`;

const initialContent: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Hello ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'italic',
            },
          ],
          text: 'word',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'image',
          attrs: {
            alt: '',
            crop: null,
            height: 160,
            width: 400,
            rotate: null,
            src: proxySrc,
            title: '',
            fileName: null,
            resizable: false,
          },
        },
      ],
    },
    {
      type: 'codeMirror',
      attrs: {
        language: 'tsx',
      },
      content: [
        {
          type: 'text',
          text: "import React from 'react';\nimport { todoTemplateStyledCss } from 'styles';\nimport { TodoList, TodoAddItem } from 'components';\nimport styled from 'styled-components';\nimport { Toaster } from 'react-hot-toast';\n\nconst TodoTemplateBlock = styled.main`\n  ${todoTemplateStyledCss}\n`;\n\nfunction TodoTemplate() {\n  return (\n    <TodoTemplateBlock>\n      <Toaster position=\"top-center\" reverseOrder={false} />\n      <TodoList />\n      <TodoAddItem />\n    </TodoTemplateBlock>\n  );\n}\n\nexport default TodoTemplate;",
        },
      ],
    },
  ],
};

function PodoteEditorPage() {
  const [editable, setEditable] = useState<boolean>(true);
  const [testOnlyContentJSON, setTestOnlyContentJSON] = useState<RemirrorJSON>(initialContent);

  return (
    <>
      <TodoTemplateBlock>
        <TodoItemBlock editable={false} done={false}>
          <EditableButton editable={editable} onClick={() => setEditable(true)}>
            editable
          </EditableButton>
          <ViewOnlyButton editable={editable} onClick={() => setEditable(false)}>
            view only
          </ViewOnlyButton>
        </TodoItemBlock>
        <TodoListBlock>
          <TodoItemBlock editable={false} done={false}>
            <PodoteEditor
              id={uuidv4()}
              editable={editable}
              content={testOnlyContentJSON}
              setTestOnlyContentJSON={setTestOnlyContentJSON}
            />
          </TodoItemBlock>
          <TodoItemBlock editable={false} done={false}>
            <pre style={{ padding: '2em' }}>{JSON.stringify(testOnlyContentJSON, null, 4)}</pre>
          </TodoItemBlock>
        </TodoListBlock>
      </TodoTemplateBlock>
    </>
  );
}

export default PodoteEditorPage;
