// import { useTodoTrashBinStore } from 'lib/stores';
import React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { buttonStyledCss, navStyledCss } from 'styles';
import { VerticalBarIcon } from 'assets';
import { ClearTrashBinButton } from './buttons';

interface TrashBinWrapperProps {}

const Nav = styled.nav`
  ${navStyledCss}
  justify-content: flex-start;
  margin: 1em 0 0.5em 0;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0 1em 0;
`;

function TrashBinWrapper({ children }: PropsWithChildren<TrashBinWrapperProps>) {
  return (
    <PageWrapper>
      <Nav>
        <VerticalBarIcon />
        <ClearTrashBinButton />
        <VerticalBarIcon />
      </Nav>
      {children}
    </PageWrapper>
  );
}

export default TrashBinWrapper;
