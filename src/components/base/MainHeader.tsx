import React from 'react';
import { buttonStyledCss, headerStyledCss, logoNavStyledCss, navStyledCss } from 'styles';
import { Logo, VerticalBarIcon } from 'assets';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TbMinusVertical } from 'react-icons/tb';

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
        <Link to="/">
          <Button>홈</Button>
        </Link>
        <VerticalBarIcon />
        <Link to="/trash">
          <Button>휴지통</Button>
        </Link>
        <VerticalBarIcon />
        <Link to="/editorplayground">
          <Button>Editor Playground</Button>
        </Link>
        <VerticalBarIcon />
        <Link to="/mdplayground">
          <Button>Markdown Playground</Button>
        </Link>
      </Nav>
    </Header>
  );
}

export default React.memo(MainHeader);
