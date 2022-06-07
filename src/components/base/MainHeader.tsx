import React from 'react';
import { headerStyledCss, navStyledCss } from 'styles';
import { Logo } from 'assets';
import styled from 'styled-components';

export const Header = styled.header`
  ${headerStyledCss}
`;

export const Nav = styled.nav`
  ${navStyledCss}
`;

function MainHeader() {
  return (
    <Header>
      <Nav>
        <Logo width="150" height="50" />
      </Nav>
    </Header>
  );
}

export default React.memo(MainHeader);
