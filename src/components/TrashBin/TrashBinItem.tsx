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
import { RemovedTodo, useTodoStore, useTodoTrashBinStore } from 'hooks';
import { useState } from 'react';
import { RemirrorJSON } from 'remirror';
import { FcEmptyTrash } from 'react-icons/fc';
import { FaTrashRestore } from 'react-icons/fa';

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

interface Props extends Omit<RemovedTodo, 'editable' | 'done'> {}

function TrashBinItem({ id, content, removedDt }: Props) {
  const { findRemovedItemById, deleteTodosById } = useTodoTrashBinStore();
  const { recycleItem } = useTodoStore();
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

  const onRecycleItem = () => {
    const removeTodo = findRemovedItemById({
      id,
    });
    recycleItem({ todo: removeTodo });
    deleteTodosById({ id });
  };

  const onDeleteItem = () => {
    deleteTodosById({ id });
  };
  return (
    <tbody>
      <tr>
        <td>
          <b>{id.slice(0, 4)}</b> <span style={{ opacity: '50%' }}>({id})</span>
        </td>
        <td>{removedDt}</td>
        <td>
          <Button onClick={onShowModal}>확인</Button>
          <Dialog dialogRef={dialogRef} editable={false} styleOptions={{ background: '#3b305a', width: '60vw' }}>
            <TodoTemplateBlock>
              <TodoListBlock>
                <TodoItemBlock editable={false} done={false}>
                  <PodoteEditor
                    id={id}
                    editable={false}
                    content={content}
                    editorType={'TRASH_VIEW'}
                    setTestOnlyContentJSON={setTestOnlyContentJSON}
                  />
                </TodoItemBlock>
              </TodoListBlock>
            </TodoTemplateBlock>
          </Dialog>
        </td>
        <td>
          <IconButtonWrapper onClick={onRecycleItem}>
            <FaTrashRestore />
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
