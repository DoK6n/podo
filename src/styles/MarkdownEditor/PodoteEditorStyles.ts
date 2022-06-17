import { css, TodoStylesProps } from 'styled-components';

export const extensionCountStyledCss: ReturnType<typeof css> = css`
  .remirror-editor span.remirror-max-count-exceeded {
    background-color: var(--rmr-hue-red-4);
  }
`;

export const extensionCalloutStyledCss: ReturnType<typeof css> = css<TodoStylesProps>`
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
  .remirror-editor.ProseMirror hr {
    background-color: #483d6b;
    border: 0;
    box-sizing: content-box;
    height: 0.25em;
    margin: 24px 0;
    overflow: hidden;
    padding: 0;
  }
`;

export const podoteThemeStyledCss: ReturnType<typeof css> = css`
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
  .remirror-editor .ProseMirror-selectednode {
    /* outline: 2px solid #9595d9; */
    outline: none;
  }
  .remirror-theme .ProseMirror {
    min-height: 0px;
    padding: 0px;
    padding-left: var(--rmr-space-3);
    &:active,
    &:focus {
      box-shadow: none;
      /* box-shadow: var(--rmr-color-outline) 0px 0px 0px 0.2em; */
    }
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
