import React, { useEffect, useRef, useState } from 'react';
import { cx, ProsemirrorNode } from 'remirror';
import { EditorView } from '@remirror/pm/view';
import { IEmojiData } from 'emoji-picker-react';
import {
  componentsStyledCss,
  coreStyledCss,
  extensionBlockquoteStyledCss,
  extensionCodeBlockStyledCss,
  extensionEmojiStyledCss,
  extensionFileStyledCss,
  extensionGapCursorStyledCss,
  extensionImageStyledCss,
  extensionListStyledCss,
  extensionMentionAtomStyledCss,
  extensionNodeFormattingStyledCss,
  extensionPlaceholderStyledCss,
  extensionPositionerStyledCss,
  extensionTablesStyledCss,
  extensionWhitespaceStyledCss,
  extensionYjsStyledCss,
  themeStyledCss,
} from '@remirror/styles/styled-components';
import { EditorComponent, Remirror, ThemeProvider, useActive, useChainedCommands, useRemirror } from '@remirror/react';
import {
  BoldExtension,
  CalloutExtension,
  HeadingExtension,
  HistoryExtension,
  ItalicExtension,
  UnderlineExtension,
  ImageExtension,
  DropCursorExtension,
  StrikeExtension,
  HorizontalRuleExtension,
  BlockquoteExtension,
} from 'remirror/extensions';
import styled from 'styled-components';
import { extensionCalloutStyledCss, extensionCountStyledCss, podoteThemeStyledCss } from 'styles';
import { useTodoStore } from 'hooks';
import { EmojiPickerReact } from 'components';

const PodoteTheme: ReturnType<typeof styled.div> = styled.div`
  ${componentsStyledCss}
  ${coreStyledCss}
  ${extensionBlockquoteStyledCss}
  ${extensionCalloutStyledCss}
  ${extensionCodeBlockStyledCss}
  ${extensionCountStyledCss}
  ${extensionEmojiStyledCss}
  ${extensionFileStyledCss}
  ${extensionGapCursorStyledCss}
  ${extensionImageStyledCss}
  ${extensionListStyledCss}
  ${extensionMentionAtomStyledCss}
  ${extensionNodeFormattingStyledCss}
  ${extensionPlaceholderStyledCss}
  ${extensionPositionerStyledCss}
  ${extensionTablesStyledCss}
  ${extensionWhitespaceStyledCss}
  ${extensionYjsStyledCss}
  ${themeStyledCss}
  ${podoteThemeStyledCss}
`;

const Menu = () => {
  const chain = useChainedCommands();
  const active = useActive();
  return (
    <>
      <button
        onClick={() => {
          chain.toggleBold().focus().run();
        }}
        style={{ fontWeight: active.bold() ? 'bold' : undefined }}
      >
        B
      </button>
      <button
        onMouseDown={event => event.preventDefault()}
        onClick={() => {
          chain.toggleBlockquote().focus().run();
        }}
        className={cx(active.blockquote() && 'active')}
      >
        Blockquote
      </button>
      <button
        onClick={() => {
          chain.toggleCallout({ type: 'blank' }).focus().run();
        }}
      >
        callout(blank)
      </button>
      <button
        onClick={() => {
          chain.toggleCallout({ type: 'info' }).focus().run();
        }}
      >
        callout(info)
      </button>
      <button
        onClick={() => {
          chain.toggleCallout({ type: 'warning' }).focus().run();
        }}
      >
        callout(warn)
      </button>
      <button
        onClick={() => {
          chain.toggleCallout({ type: 'error' }).focus().run();
        }}
      >
        callout(error)
      </button>
      <button
        onClick={() => {
          chain.toggleCallout({ type: 'success' }).focus().run();
        }}
      >
        callout(success)
      </button>
    </>
  );
};

interface Props {
  id: string;
  editable: boolean;
  content?: string | any | Object;
  setTestOnlyContentJSON?: any | Object;
}

function PodoteEditor({ id, editable, content, setTestOnlyContentJSON }: Props) {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const { editItemText } = useTodoStore();

  const renderDialogEmoji = (node: ProsemirrorNode, view: EditorView, getPos: () => number) => {
    const { emoji: prevEmoji } = node.attrs;
    const emoji = document.createElement('span');
    emoji.dataset.emojiContainer = '';
    emoji.textContent = prevEmoji;
    emoji.style.cursor = 'pointer';
    emoji.dataset.id = id;
    emoji.addEventListener('mousedown', e => e.preventDefault());

    return emoji;
  };

  const extensions = () => [
    new BoldExtension(), // 굵게
    new ItalicExtension(), // 기울임
    new StrikeExtension(), // 취소선
    new UnderlineExtension(), // 밑줄
    new HeadingExtension(), // 머리말 1 ~ 6
    new CalloutExtension({ defaultType: 'blank', renderEmoji: renderDialogEmoji, defaultEmoji: '💡' }), // 콜아웃
    new HistoryExtension(), //실행 취소 및 다시 실행 명령을 제공하고 기록 관련 작업을 처리
    new ImageExtension(), // 이미지 삽입
    new DropCursorExtension({ color: '#7963d2', width: 4 }), // 드롭한 대상이 놓일 위치를 표시
    new HorizontalRuleExtension(), // 수평선 추가
    new BlockquoteExtension(), // 인용문
  ];

  const initialContent = {
    type: 'doc',
    content: [
      { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Hello world' }] },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Hello ' },
          { type: 'text', marks: [{ type: 'italic' }], text: 'word' },
        ],
      },
    ],
  };

  const { manager, state, setState } = useRemirror({
    extensions: extensions,
    content: content ? content : initialContent,
    selection: 'end',
  });

  const onChangeState = (parameter: any) => {
    // Update the state to the latest value.
    setState(parameter.state);

    // editor testing page only
    if (setTestOnlyContentJSON) setTestOnlyContentJSON(parameter.state.doc);
    else editItemText({ id, content: parameter.state.doc }); // main page update content object
  };

  return (
    <PodoteTheme id={'podote-theme'}>
      <ThemeProvider>
        <Remirror manager={manager} initialContent={state} onChange={onChangeState} editable={editable}>
          {editable ? <Menu /> : null}
          <EditorComponent />
          {editable ? (
            <EmojiPickerReact
              itemId={id}
              editable={editable}
              chosenEmoji={chosenEmoji}
              setChosenEmoji={setChosenEmoji}
            />
          ) : null}
        </Remirror>
      </ThemeProvider>
    </PodoteTheme>
  );
}

export default PodoteEditor;
