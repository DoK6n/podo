import React, { useCallback, useRef, useState } from 'react';
import { ProsemirrorNode, RemirrorJSON } from 'remirror';
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
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from '@remirror/react';
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
  CodeExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
} from 'remirror/extensions';
import styled, { TodoStylesProps } from 'styled-components';

import { extensionCalloutStyledCss, extensionCountStyledCss, podoteThemeStyledCss } from 'styles';
import { useTodoStore, ToggleListItemExtension } from 'hooks';
import { EmojiPickerReact, PodoteEditorMenu } from 'components';
const PodoteTheme = styled.div<TodoStylesProps>`
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

interface Props {
  id: string;
  editable: boolean;
  content: RemirrorJSON;
  setTestOnlyContentJSON?: React.Dispatch<React.SetStateAction<RemirrorJSON>>;
}

interface ChildForwardRefObjects {
  handleClickEmoji: (e?: MouseEvent) => void;
}

function PodoteEditor({ id, editable, content, setTestOnlyContentJSON }: Props) {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const { editItemText } = useTodoStore();
  const childRef = useRef<ChildForwardRefObjects>({
    handleClickEmoji: () => {},
  });

  const renderDialogEmoji = (node: ProsemirrorNode, view: EditorView, getPos: () => number) => {
    const { emoji: prevEmoji } = node.attrs;
    const emoji = document.createElement('span');
    emoji.dataset.emojiContainer = '';
    emoji.textContent = prevEmoji;
    emoji.style.cursor = 'pointer';
    emoji.dataset.id = id;
    emoji.addEventListener('mousedown', e => e.preventDefault());
    emoji.addEventListener('click', childRef.current.handleClickEmoji);
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
    new ImageExtension({ enableResizing: true }), // 이미지 삽입
    new DropCursorExtension({ color: '#7963d2', width: 4 }), // 드롭한 대상이 놓일 위치를 표시
    new HorizontalRuleExtension(), // 수평선 추가
    new BlockquoteExtension(), // 인용문
    new CodeExtension(), // Inline Code Blocks
    new BulletListExtension({ enableSpine: true }),
    new OrderedListExtension(),
    new TaskListExtension(),
    new ToggleListItemExtension(),
  ];

  const { manager, state, setState } = useRemirror({
    extensions: extensions,
    content: content ? content : { type: 'doc' },
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
    <PodoteTheme editable={editable}>
      <ThemeProvider>
        <Remirror manager={manager} initialContent={state} onChange={onChangeState} editable={editable}>
          {editable ? <PodoteEditorMenu /> : null}
          <EditorComponent />
          {editable ? (
            <EmojiPickerReact
              itemId={id}
              editable={editable}
              chosenEmoji={chosenEmoji}
              setChosenEmoji={setChosenEmoji}
              ref={childRef}
            />
          ) : null}
        </Remirror>
      </ThemeProvider>
    </PodoteTheme>
  );
}

export default PodoteEditor;
