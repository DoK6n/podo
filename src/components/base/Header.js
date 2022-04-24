import React from 'react';
import { HeaderBlock, NavBlock } from '../../styles/base';

function Header() {
  return (
    <HeaderBlock>
      <NavBlock></NavBlock>
    </HeaderBlock>
  );
}

export default React.memo(Header);
