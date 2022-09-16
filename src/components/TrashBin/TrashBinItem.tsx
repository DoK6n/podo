import React, { useRef } from 'react';
import {
  buttonStyledCss,
  removeIconStyledCss,
  todoItemBlockStyledCss,
  todoListBlockStyledCss,
  todoTemplateStyledCss,
} from 'styles';
import styled, { TodoStylesProps } from 'styled-components';
import { Dialog, PodoteEditor } from 'components';
// import { RemovedTodo } from 'lib/stores';
import { useState } from 'react';
import { RemirrorJSON } from 'remirror';
import { FcEmptyTrash } from 'react-icons/fc';
import { FaTrashRestore } from 'react-icons/fa';
import { Todo } from 'podote/interfaces';
import dayjs from 'dayjs';

const Button = styled.button`
  ${buttonStyledCss}
  color: #abb2bf;
`;

const IconButtonWrapper = styled.div`
  ${removeIconStyledCss}
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

  // 할일 항목 복원
  const onRecycleItem = () => {};

  // 할일 항목 영구삭제
  const onDeleteItem = () => {};

  return (
    <tbody>
      <tr>
        <td>
          <b>{id.slice(0, 4)}</b> <span style={{ opacity: '50%' }}>({id})</span>
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
          <IconButtonWrapper onClick={onRecycleItem}>
            <FaTrashRestore viewBox="0 -100 448 612" />
          </IconButtonWrapper>
        </td>
        <td>
          <IconButtonWrapper onClick={onDeleteItem}>
            <FcEmptyTrash />
          </IconButtonWrapper>
        </td>
      </tr>
    </tbody>
  );
}

export default TrashBinItem;
