import { useTodoTrashBinStore } from 'lib/stores';
import React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { buttonStyledCss, navStyledCss } from 'styles';
import { VerticalBarIcon } from 'assets';

interface Props {}

const Button = styled.button`
  ${buttonStyledCss}
  color: #abb2bf;
`;

export const Nav = styled.nav`
  ${navStyledCss}
  justify-content: flex-start;
  margin: 1em 0 0.5em 0;
`;

function TrashWrapper({ children }: PropsWithChildren<Props>) {
  const { deleteAllTodos } = useTodoTrashBinStore();

  const onDeleteAll = () => {
    deleteAllTodos();
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1em 0 1em 0',
        }}
      >
        <Nav>
          <VerticalBarIcon />
          <Button onClick={onDeleteAll}>휴지통 비우기</Button>
          <VerticalBarIcon />
        </Nav>
        {children}
      </div>
    </>
  );
}

export default TrashWrapper;
