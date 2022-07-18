import { Tooltip } from 'components';
import React, { PropsWithChildren } from 'react';
import styled, { MenuButtonStyledProps } from 'styled-components';
import { menuButtonStyledCss } from 'styles';

const MenuButtonWrapper = styled.button<MenuButtonStyledProps>`
  ${menuButtonStyledCss}
  background-color: ${({ isActive }) => (isActive ? '#483d6b' : undefined)};
`;

interface Props {
  onClick?: (e?: any) => void;
  isActive?: boolean;
}

function MenuButton({ children, onClick, isActive }: PropsWithChildren<Props>) {
  return (
    <Tooltip>
      <MenuButtonWrapper onClick={onClick} isActive={isActive}>
        {children}
      </MenuButtonWrapper>
    </Tooltip>
  );
}

export default MenuButton;
