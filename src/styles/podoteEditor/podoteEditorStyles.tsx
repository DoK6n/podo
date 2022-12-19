import { css, TodoStylesProps } from 'styled-components';
import { inputStyledCss, podoteColorsStyledCss } from 'styles';

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
    border-left-color: var(--podote-color-dark-4);
  }
  .remirror-editor.ProseMirror hr {
    background-color: var(--podote-color-dark-4);
    border: 0;
    box-sizing: content-box;
    height: 0.25em;
    margin: 24px 0;
    overflow: hidden;
    padding: 0;
  }
  .remirror-editor.ProseMirror blockquote {
    padding-left: 20px;
  }
`;

export const listItemStyledCss: ReturnType<typeof css> = css`
  & .remirror-editor li.remirror-list-item-with-custom-mark {
    &[data-checked] > label.remirror-list-item-marker-container + input[type='checkbox'] {
      background: #9595d9;
    }
    & label.remirror-list-item-marker-container {
      & > .remirror-collapsible-list-item-button {
        background: var(--podote-color-dark-1);
        &.disabled {
          background: var(--podote-color-dark-3);
        }
      }
    }
    & div > ul > div.remirror-list-spine {
      border-left-color: var(--podote-color-dark-4);
    }
  }
`;

// 읽기모드 스타일
export const readModeStyledCss: ReturnType<typeof css> = css<TodoStylesProps>`
  & .remirror-editor .remirror-resizable-view :nth-child(n + 1):nth-child(-n + 2) {
    display: ${({ editable }) => (editable === false ? 'none' : 'col-resize')} !important;
    cursor: ${({ editable }) => (editable === false ? 'default' : 'col-resize')} !important;
  }
`;

// Static HTML Rendering 스타일
export const remirrorHTMLrendererStyledCss: ReturnType<typeof css> = css`
  .remirror-html-renderer-wrapper .remirror-html-renderer-editor img {
    width: 100%;
    min-width: 50px;
    object-fit: contain;
  }
`;

export const floatingLinkToolbarStyledCss: ReturnType<typeof css> = css`
  .remirror-floating-popover {
    z-index: 10;
    & > input {
      ${inputStyledCss}
    }
  }
  .remirror-role {
    color: var(--podote-color-heading-text);
    background-color: transparent;
  }
  .remirror-button.remirror-tabbable {
    border: 1px solid var(--podote-color-heading-text);
    background-color: var(--podote-color-normal-1);
  }
  .remirror-group {
    background-color: transparent;
  }
`;

// 메뉴
export const menuFormStyledCss: ReturnType<typeof css> = css`
  display: flex;
  align-items: center;
`;

export const menuBarStyledCss: ReturnType<typeof css> = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const podoteThemeStyledCss: ReturnType<typeof css> = css`
  ${podoteColorsStyledCss}

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
  a {
    color: var(--podote-color-light-1);
  }
  .remirror-editor .ProseMirror-selectednode {
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
    padding-top: 0;
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

  .remirror-editor.ProseMirror {
    overflow-y: hidden;
  }
  
  .remirror-theme .remirror-editor-wrapper .remirror-editor code {
    background: var(--podote-color-dark-4);
    padding: 0.2em 0.4em;
    font-size: 85%;
    border-radius: 6px;
  }
  ${listItemStyledCss}
  ${readModeStyledCss}
  ${floatingLinkToolbarStyledCss}
`;
