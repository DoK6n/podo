import React from 'react';
import { buttonStyledCss, headerStyledCss, logoNavStyledCss, navStyledCss } from 'styles';
import { Logo, VerticalBarIcon } from 'assets';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthGoogleLogin } from 'components';
import { authMode, useAuthStore } from 'lib/stores';

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
  const { currentUserInfo, mode } = useAuthStore();
  return (
    <Header>
      <LogoNav>
        <Logo width="150" height="50" />
      </LogoNav>
      <Nav>
        {mode === authMode.GUEST_MODE && currentUserInfo === null ? null : (
          <React.Fragment>
            <Button>{currentUserInfo?.displayName} 님</Button>
            <VerticalBarIcon />
            <Link to="/todo">
              <Button>Todo</Button>
            </Link>
            <VerticalBarIcon />
            <Link to="/todo/trash">
              <Button>휴지통</Button>
            </Link>
            <VerticalBarIcon />
          </React.Fragment>
        )}
        <AuthGoogleLogin />
        <VerticalBarIcon />
        <Link to="/">
          <Button>홈</Button>
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
