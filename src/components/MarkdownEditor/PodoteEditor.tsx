import React from 'react';
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
} from 'remirror/extensions';
import styled, { css } from 'styled-components';

// editor theme styling
const extensionCountStyledCss: ReturnType<typeof css> = css`
  .remirror-editor span.remirror-max-count-exceeded {
    background-color: var(--rmr-hue-red-4);
  }
`;

export const extensionCalloutStyledCss: ReturnType<typeof css> = css`
  .remirror-editor div[data-callout-type] {
    display: flex;
    margin-left: 0;
    margin-right: 0;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-end: 40px;
    padding: 10px;
    border-left: 0.25em solid transparent;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .remirror-editor div[data-callout-type] > :not(.remirror-callout-emoji-wrapper) {
    margin-left: 8px;
    flex-grow: 1;
  }
  .remirror-editor div[data-callout-type='info'] {
    background: #3298dc11;
    border-left-color: #3298dc;
  }
  .remirror-editor div[data-callout-type='warning'] {
    background: #ffdd5711;
    border-left-color: #ffdd57;
  }
  .remirror-editor div[data-callout-type='error'] {
    background: #f1466811;
    border-left-color: #f14668;
  }
  .remirror-editor div[data-callout-type='success'] {
    background: #48c77411;
    border-left-color: #48c774;
  }
  .remirror-editor div[data-callout-type='blank'] {
    background: #483d6b5c;
    border-left-color: #483d6b;
  }
`;

const PodoteThemeStyledCss: ReturnType<typeof css> = css`
  --podote-color-heading-text: #c9d1d9;
  --podote-color-normal-text: #abb2bf;

  width: 100%;
  padding: 15px 0 15px 0;
  color: var(--podote-color-normal-text);
  strong,
  b,
  strong *,
  b * {
    // styled-reset으로 인해 font: inherit이 적용된 태그에 bold, italic 재정의
    font-weight: bold;
  }
  em,
  i,
  em *,
  i {
    font-style: italic;
  }

  .remirror-theme h1,
  .remirror-theme h2,
  .remirror-theme h3,
  .remirror-theme h4,
  .remirror-theme h5,
  .remirror-theme h6 {
    color: var(--podote-color-heading-text);
  }
  .remirror-editor-wrapper {
    padding-top: 10px;
  }
  .remirror-theme .ProseMirror {
    box-shadow: transparent 0px 0px 0px 0.1em;
  }
  .remirror-theme {
    --rmr-color-selection-background: var(--rmr-color-outline);
    --rmr-color-selection-shadow: inherit;
    --rmr-color-selection-text: var(--podote-color-text);
    --rmr-color-selection-caret: inherit;
  }
`;

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
  ${PodoteThemeStyledCss}
`;

const Menu = () => {
  const chain = useChainedCommands();
  const active = useActive();
  return (
    <button
      onClick={() => {
        chain //
          .toggleBold()
          .focus()
          .run();
      }}
      style={{ fontWeight: active.bold() ? 'bold' : undefined }}
    >
      B
    </button>
  );
};

function PodoteEditor() {
  const extensions = () => [
    new BoldExtension(),
    new ItalicExtension(),
    new UnderlineExtension(),
    new HeadingExtension(),
    new CalloutExtension({ defaultType: 'warn' }),
    new HistoryExtension(),
    new ImageExtension(),
    new DropCursorExtension({ color: '#7963d2' }),
  ];
  const { manager, state, setState } = useRemirror({
    extensions: extensions,
    content: `<p>I love <b>Remirror</b></p>
      <p><img src="https://dummyimage.com/200x80/479e0c/fafafa"></p>
    `,
    selection: 'end',
    stringHandler: 'html',
  });

  const onChangeState = (parameter: any) => {
    // Update the state to the latest value.
    setState(parameter.state);
    console.log(state);
    console.log(parameter);
  };

  return (
    <PodoteTheme id={'podote-theme'}>
      <ThemeProvider>
        <Remirror manager={manager} initialContent={state} onChange={onChangeState}>
          <Menu />
          <EditorComponent />
        </Remirror>
      </ThemeProvider>
    </PodoteTheme>
  );
}

export default PodoteEditor;
