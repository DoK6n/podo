import React from 'react';
import { HeaderBlock, NavBlock } from 'styles';
import { Logo } from 'assets';

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
