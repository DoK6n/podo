import styled, { MenuButtonStyledProps } from 'styled-components';
import { menuButtonStyledCss } from 'styles';
import { HeadingButton } from 'components';
import { useActive, useChainedCommands, useRemirrorContext } from '@remirror/react';
import { GrBlockQuote } from 'react-icons/gr';
import { TbList, TbListNumbers, TbListCheck } from 'react-icons/tb';
import { RiCodeBoxLine } from 'react-icons/ri';
import { MdFormatBold, MdFormatItalic, MdCode, MdFormatUnderlined } from 'react-icons/md';
import { AiOutlineStrikethrough } from 'react-icons/ai';
import { CalloutBlank, CalloutError, CalloutInfo, CalloutWarn, CalloutSuccess } from 'assets';
import { CodeMirror6Extension } from 'hooks';

const MenuButton = styled.button<MenuButtonStyledProps>`
  ${menuButtonStyledCss}
  background-color: ${({ isActive }) => (isActive ? '#483d6b' : undefined)};
`;

const CreateCodeMirrorButton = ({ language }: { language: string }) => {
  const { commands } = useRemirrorContext<CodeMirror6Extension>({ autoUpdate: true });
  const { createCodeMirror } = commands;
  const enabled = createCodeMirror.enabled({ language });

  return (
    <MenuButton onClick={() => createCodeMirror({ language })} isActive={!enabled}>
      <RiCodeBoxLine />
    </MenuButton>
  );
};

function PodoteEditorMenu() {
  const chain = useChainedCommands();
  const active = useActive();
  return (
    <>
      <HeadingButton level={1} />
      <HeadingButton level={2} />
      <HeadingButton level={3} />
      <HeadingButton level={4} />
      <HeadingButton level={5} />
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
          chain.toggleItalic().focus().run();
        }}
        isActive={active.italic()}
      >
        <MdFormatItalic />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleUnderline().focus().run();
        }}
        isActive={active.underline()}
      >
        <MdFormatUnderlined />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleStrike().focus().run();
        }}
        isActive={active.strike()}
      >
        <AiOutlineStrikethrough />
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
          chain.toggleBulletList().focus().run();
        }}
        isActive={active.bulletList()}
      >
        <TbList />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleOrderedList().focus().run();
        }}
        isActive={active.orderedList()}
      >
        <TbListNumbers />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleTaskList().focus().run();
        }}
        isActive={active.taskList()}
      >
        <TbListCheck />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'blank' }).focus().run();
        }}
        isActive={active.callout({ type: 'blank' })}
      >
        <CalloutBlank />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'info', emoji: '💡' }).focus().run();
        }}
        isActive={active.callout({ type: 'info' })}
      >
        <CalloutInfo />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'warning', emoji: '⚠️' }).focus().run();
        }}
        isActive={active.callout({ type: 'warning' })}
      >
        <CalloutWarn />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'error', emoji: '🚨' }).focus().run();
        }}
        isActive={active.callout({ type: 'error' })}
      >
        <CalloutError />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'success', emoji: '✅' }).focus().run();
        }}
        isActive={active.callout({ type: 'success' })}
      >
        <CalloutSuccess />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCode().focus().run();
        }}
        isActive={active.code()}
      >
        <MdCode />
      </MenuButton>
      <CreateCodeMirrorButton language="javascript" />
    </>
  );
}

export default PodoteEditorMenu;
