import { css } from 'styled-components';

export const markdownEditorStyledCss: ReturnType<typeof css> = css`
  width: 100%;
  .editor-wrapper {
    height: 100%;
    flex: 0 0 100%;
    outline: none;
    padding: 12px;
  }

  .em-editor {
    width: 60%;
  }

  .cm-gutters {
    background-color: transparent !important;
  }

  .CodeMirror-cursor,
  .CodeMirror div.CodeMirror-secondarycursor {
    border-color: #efeef3;
  }

  .cm-activeLineGutter,
  .cm-activeLine {
    background-color: #5c4b8c5b !important;
  }

  .cm-activeLineGutter {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .cm-activeLine {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .cm-focused {
    outline: 0 !important;
  }
`;
