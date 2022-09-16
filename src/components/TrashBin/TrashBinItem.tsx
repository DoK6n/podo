import React, { useRef } from 'react';
import { buttonStyledCss, todoItemBlockStyledCss, todoListBlockStyledCss, todoTemplateStyledCss } from 'styles';
import styled, { TodoStylesProps } from 'styled-components';
import { Dialog, PodoteEditor } from 'components';
import { useState } from 'react';
import { RemirrorJSON } from 'remirror';
import { Todo } from 'podote/interfaces';
import dayjs from 'dayjs';
import { DeleteButton, RecycleButton } from './buttons';

const Button = styled.button`
  ${buttonStyledCss}
  color: #abb2bf;
`;

const TodoItemBlock = styled.section<TodoStylesProps>`
  ${todoItemBlockStyledCss}
`;

const TodoListBlock = styled.article`
  ${todoListBlockStyledCss}
`;

const TodoTemplateBlock = styled.main`
  ${todoTemplateStyledCss}
`;

// 옵셔널 속성을 필수 속성으로 변경하는 타입
// type WithRequiredProperty<T, K extends keyof T> = T & {
//   [P in K]-?: T[P];
// };
// 특정 옵셔널 속성값을 필수값으로 변경한 타입
// interface RemovedTodoWithRequired extends WithRequiredProperty<RemovedTodo, 'removedDt'> {}

export interface RemovedTodo extends Required<Todo> {} // removedDt를 필수속성값으로 변경

// 필수로 변경한 타입에서 특정 속성들을 제거한 타입
interface Props extends Omit<RemovedTodo, 'editable' | 'done' | 'orderKey'> {}

function TrashBinItem({ id, content, removedDt }: Props) {
  const [testOnlyContentJSON, setTestOnlyContentJSON] = useState<RemirrorJSON>({
    type: 'doc',
  });
  const dialogRef = useRef<any>();

  const onShowModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target === dialogRef.current) {
      dialogRef.current.close();
    }
    dialogRef.current.showModal();
  };

  return (
    <tbody>
      <tr>
        <td>
          <b>{id.slice(0, 7)}</b>
        </td>
        <td>{dayjs(removedDt).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td>
          <Button onClick={onShowModal}>확인</Button>
          <Dialog
            dialogRef={dialogRef}
            editable={false}
            styleOptions={{ background: '#3b305a', width: '60vw', textAlign: 'start' }}
          >
            <TodoTemplateBlock>
              <TodoListBlock>
                <TodoItemBlock editable={false} done={false}>
                  <PodoteEditor
                    id={id}
                    editable={false}
                    content={content}
                    editorType={'TEST_PAGE'}
                    setTestOnlyContentJSON={setTestOnlyContentJSON}
                  />
                </TodoItemBlock>
              </TodoListBlock>
            </TodoTemplateBlock>
          </Dialog>
        </td>
        <td>
          <RecycleButton id={id} />
        </td>
        <td>
          <DeleteButton id={id} />
        </td>
      </tr>
    </tbody>
  );
}

export default TrashBinItem;
