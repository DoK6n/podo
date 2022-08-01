import { useTodoTrashBinStore } from 'hooks';
import React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyledCss } from 'styles';

interface Props {}

const Button = styled.button`
  ${buttonStyledCss}
  color: #abb2bf;
`;

function TrashWrapper({ children }: PropsWithChildren<Props>) {
  const { deleteAllTodos } = useTodoTrashBinStore();

  const onDeleteAll = () => {
    deleteAllTodos();
  };

  return (
    <>
      <Link to="/">
        <Button>메인 화면으로</Button>
      </Link>
      <Button onClick={onDeleteAll}>휴지통 비우기</Button>
      <div
        style={{
          border: '1px solid gray',
          display: 'flex',
          flexDirection: 'column',
          padding: '1em 0 1em 0',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default TrashWrapper;
