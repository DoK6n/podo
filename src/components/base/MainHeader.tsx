import React from 'react';
import { buttonStyledCss, headerStyledCss, navStyledCss } from 'styles';
import { Logo } from 'assets';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  ${headerStyledCss}
`;

export const Nav = styled.nav`
  ${navStyledCss}
`;

const Button = styled.button`
  ${buttonStyledCss}
  color: #abb2bf;
`;

function MainHeader() {
  return (
    <Header>
      <Nav>
        <Logo width="150" height="50" />
      </Nav>
      <Link to="/trash">
        <Button>휴지통</Button>
      </Link>
    </Header>
  );
}

export default React.memo(MainHeader);
