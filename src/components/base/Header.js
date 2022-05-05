import React from 'react';
import { HeaderBlock, NavBlock } from '@styles/base';
import { ReactComponent as Logo } from '@assets/logo.svg';

function Header() {
  return (
    <HeaderBlock>
      <NavBlock>
        <Logo width="150" height="50" />
      </NavBlock>
    </HeaderBlock>
  );
}

export default React.memo(Header);
