import React from 'react';
import { useActive, useChainedCommands } from '@remirror/react';
import styled, { MenuButtonStyledProps } from 'styled-components';
import { menuButtonStyledCss } from 'styles';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'assets';

interface Props {
  level: number;
}

const MenuButton = styled.button<MenuButtonStyledProps>`
  ${menuButtonStyledCss}
  background-color: ${({ isActive }) => (isActive ? '#483d6b' : undefined)};
`;

function HeadingButton({ level }: Props) {
  const chain = useChainedCommands();
  const active = useActive();

  const switchRenderHeading = (lv: number) => {
    switch (lv) {
      case 2:
        return <Heading2 />;
      case 3:
        return <Heading3 />;
      case 4:
        return <Heading4 />;
      case 5:
        return <Heading5 />;
      case 6:
        return <Heading6 />;
      default:
        return <Heading1 />;
    }
  };
  return (
    <MenuButton
      onClick={() => {
        chain.toggleHeading({ level: level }).focus().run();
      }}
      isActive={active.heading({ level: level })}
    >
      {switchRenderHeading(level)}
    </MenuButton>
  );
}

export default HeadingButton;
