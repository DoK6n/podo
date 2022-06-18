import styled from 'styled-components';
import { menuButtonStyledCss } from 'styles';
import { useActive, useChainedCommands } from '@remirror/react';

import { GrBlockQuote } from 'react-icons/gr';
import { MdFormatBold, MdChatBubble } from 'react-icons/md';

interface MenuButtonStyledProps {
  isActive?: boolean;
  done?: boolean;
}

const MenuButton = styled.button<MenuButtonStyledProps>`
  ${menuButtonStyledCss}
  background-color: ${({ isActive }) => (isActive ? '#483d6b' : undefined)};
`;

function PodoteEditorMenu() {
  const chain = useChainedCommands();
  const active = useActive();
  return (
    <>
      <MenuButton
        onClick={() => {
          chain.toggleBold().focus().run();
        }}
        isActive={active.bold()}
      >
        <MdFormatBold />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleBlockquote().focus().run();
        }}
        isActive={active.blockquote()}
      >
        <GrBlockQuote />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'blank' }).focus().run();
        }}
        isActive={active.callout({ type: 'blank' })}
      >
        <MdChatBubble style={{ fill: '#6e5ea3' }} />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'info', emoji: '💡' }).focus().run();
        }}
        isActive={active.callout({ type: 'info' })}
      >
        <MdChatBubble style={{ fill: '#3298dc' }} />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'warning', emoji: '⚠️' }).focus().run();
        }}
        isActive={active.callout({ type: 'warning' })}
      >
        <MdChatBubble style={{ fill: '#ffdd57' }} />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'error', emoji: '🚨' }).focus().run();
        }}
        isActive={active.callout({ type: 'error' })}
      >
        <MdChatBubble style={{ fill: '#f14668' }} />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'success', emoji: '✅' }).focus().run();
        }}
        isActive={active.callout({ type: 'success' })}
      >
        <MdChatBubble style={{ fill: '#48c774' }} />
      </MenuButton>
    </>
  );
}

export default PodoteEditorMenu;
