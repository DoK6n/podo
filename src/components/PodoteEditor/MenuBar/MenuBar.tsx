import React from 'react';
import styled, { MenuButtonStyledProps } from 'styled-components';
import { menuBarStyledCss, accordionWrapperStyledCss } from 'styles';
import { HeadingButton, MenuButton, AddIframeButton } from 'components';
import { useActive, useChainedCommands, useRemirrorContext } from '@remirror/react';
import { GrBlockQuote } from 'react-icons/gr';
import { TbList, TbListNumbers, TbListCheck } from 'react-icons/tb';
import { RiCodeBoxLine } from 'react-icons/ri';
import { MdFormatBold, MdFormatItalic, MdCode, MdFormatUnderlined } from 'react-icons/md';
import { AiOutlineStrikethrough } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';
import {
  RiInsertColumnRight,
  RiInsertColumnLeft,
  RiInsertRowTop,
  RiInsertRowBottom,
  RiDeleteColumn,
  RiDeleteRow,
} from 'react-icons/ri';
import { CalloutBlank, CalloutError, CalloutInfo, CalloutWarn, CalloutSuccess } from 'assets';
import { CodeMirror6Extension } from 'lib/remirror/extensions';

const MenuBarWrapper = styled.div`
  ${menuBarStyledCss}
`;

const AccordionWrapper = styled.div<MenuButtonStyledProps>`
  ${accordionWrapperStyledCss}
`;

const CreateCodeMirrorButton = ({ language }: { language: string }) => {
  const { commands } = useRemirrorContext<CodeMirror6Extension>({ autoUpdate: true });
  const { createCodeMirror } = commands;
  const enabled = createCodeMirror.enabled({ language });

  return (
    <MenuButton
      onClick={() => createCodeMirror({ language: language })}
      isActive={!enabled}
      titleOption={{ title: 'CodeBlock (```' + language + ')' }}
    >
      <RiCodeBoxLine />
    </MenuButton>
  );
};

function MenuBar() {
  const chain = useChainedCommands();
  const active = useActive();
  return (
    <MenuBarWrapper>
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
        titleOption={{ title: 'Bold', commandName: 'toggleBold' }}
      >
        <MdFormatBold />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleItalic().focus().run();
        }}
        isActive={active.italic()}
        titleOption={{ title: 'Italic', commandName: 'toggleItalic' }}
      >
        <MdFormatItalic />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleUnderline().focus().run();
        }}
        isActive={active.underline()}
        titleOption={{ title: 'Underline', commandName: 'toggleUnderline' }}
      >
        <MdFormatUnderlined />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleStrike().focus().run();
        }}
        isActive={active.strike()}
        titleOption={{ title: 'Strike', commandName: 'toggleStrike' }}
      >
        <AiOutlineStrikethrough />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleBlockquote().focus().run();
        }}
        isActive={active.blockquote()}
        titleOption={{ title: 'Blockquote', commandName: 'toggleBlockquote' }}
      >
        <GrBlockQuote />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleBulletList().focus().run();
        }}
        isActive={active.bulletList()}
        titleOption={{ title: 'BulletList', commandName: 'toggleBulletList' }}
      >
        <TbList />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleOrderedList().focus().run();
        }}
        isActive={active.orderedList()}
        titleOption={{ title: 'OrderedList', commandName: 'toggleOrderedList' }}
      >
        <TbListNumbers />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleTaskList().focus().run();
        }}
        isActive={active.taskList()}
        titleOption={{ title: 'TaskList', commandName: 'toggleTaskList' }}
      >
        <TbListCheck />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'blank' }).focus().run();
        }}
        isActive={active.callout({ type: 'blank' })}
        titleOption={{ title: 'Callout', commandName: 'toggleCallout' }}
      >
        <CalloutBlank />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'info', emoji: '💡' }).focus().run();
        }}
        isActive={active.callout({ type: 'info' })}
        titleOption={{ title: 'Callout-info', commandName: '' }}
      >
        <CalloutInfo />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'warning', emoji: '⚠️' }).focus().run();
        }}
        isActive={active.callout({ type: 'warning' })}
        titleOption={{ title: 'Callout-warn', commandName: '' }}
      >
        <CalloutWarn />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'error', emoji: '🚨' }).focus().run();
        }}
        isActive={active.callout({ type: 'error' })}
        titleOption={{ title: 'Callout-error', commandName: '' }}
      >
        <CalloutError />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCallout({ type: 'success', emoji: '✅' }).focus().run();
        }}
        isActive={active.callout({ type: 'success' })}
        titleOption={{ title: 'Callout-success', commandName: '' }}
      >
        <CalloutSuccess />
      </MenuButton>
      <MenuButton
        onClick={() => {
          chain.toggleCode().focus().run();
        }}
        isActive={active.code()}
        titleOption={{ title: 'Code', commandName: 'toggleCode' }}
      >
        <MdCode />
      </MenuButton>
      <CreateCodeMirrorButton language="javascript" />
      <AddIframeButton />
      <MenuButton
        onClick={() => {
          !active.table() ? chain.createTable().focus().run() : chain.deleteTable().focus().run();
        }}
        isActive={active.table()}
        titleOption={{ title: 'Table', commandName: 'toggleTable' }}
      >
        <BsTable />
      </MenuButton>
      <AccordionWrapper isToggle={active.table()}>
        <MenuButton
          onClick={() => {
            chain.addTableColumnAfter().focus().run();
          }}
          titleOption={{ title: 'addTableColumnAfter' }}
        >
          <RiInsertColumnRight />
        </MenuButton>
        <MenuButton
          onClick={() => {
            chain.addTableColumnBefore().focus().run();
          }}
          titleOption={{ title: 'addTableColumnBefore', commandName: 'toggleTable' }}
        >
          <RiInsertColumnLeft />
        </MenuButton>
        <MenuButton
          onClick={() => {
            chain.addTableRowBefore().focus().run();
          }}
          titleOption={{ title: 'addTableRowBefore', commandName: 'toggleTable' }}
        >
          <RiInsertRowTop />
        </MenuButton>
        <MenuButton
          onClick={() => {
            chain.addTableRowAfter().focus().run();
          }}
          titleOption={{ title: 'addTableRowAfter', commandName: 'toggleTable' }}
        >
          <RiInsertRowBottom />
        </MenuButton>
        <MenuButton
          onClick={() => {
            chain.deleteTableColumn().focus().run();
          }}
          titleOption={{ title: 'deleteTableColumn', commandName: 'deleteTableColumn' }}
        >
          <RiDeleteColumn />
        </MenuButton>
        <MenuButton
          onClick={() => {
            chain.deleteTableRow().focus().run();
          }}
          titleOption={{ title: 'deleteTableRow', commandName: 'deleteTableRow' }}
        >
          <RiDeleteRow />
        </MenuButton>
      </AccordionWrapper>
    </MenuBarWrapper>
  );
}

export default MenuBar;
