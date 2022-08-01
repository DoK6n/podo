import React from 'react';
import { buttonStyledCss, headerStyledCss, logoNavStyledCss, navStyledCss } from 'styles';
import { Logo } from 'assets';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  ${headerStyledCss}
`;

export const LogoNav = styled.nav`
  ${logoNavStyledCss}
`;

export const Nav = styled.nav`
  ${navStyledCss}
`;

const Button = styled.button`
  ${buttonStyledCss}
`;

function MainHeader() {
  return (
    <Header>
      <LogoNav>
        <Logo width="150" height="50" />
      </LogoNav>
      <Nav>
        <Link to="/trash">
          <Button>휴지통</Button>
        </Link>
        <Link to="/editor">
          <Button>Editor demo</Button>
        </Link>
        <Link to="/test">
          <Button>MD preview demo</Button>
        </Link>
      </Nav>
    </Header>
  );
}

export default React.memo(MainHeader);
