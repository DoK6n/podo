import { css, TodoStylesProps } from 'styled-components';

export const markdownPlaygroundViewerStyledCss: ReturnType<typeof css> = css<TodoStylesProps>`
  opacity: ${({ done }) => (done === false ? '1' : '0.1')};
  display: ${({ editable }) => (editable ? 'none' : 'inline-block')};

  .preview.markdown-body {
    flex: 0 0 50%;
    padding: 12px;
    box-sizing: border-box;
    overflow: auto;
    color: #abb2bf;
    background: transparent;
    width: 100%;
  }

  .preview.markdown-body h1,
  .preview.markdown-body h2 {
    border-bottom: 1px solid #65519d5b;
  }

  .markdown-body hr {
    background-color: #483d6b;
  }

  .preview.markdown-body a {
    color: #9595d9;
  }

  .preview.markdown-body code {
    color: #abb2bf;
    background: #483d6b;
  }

  .preview.markdown-body pre {
    background: #483d6b;
  }

  .preview.markdown-body pre div span svg {
    opacity: 0;
    border-radius: 5px;
    border: 2px solid #bfa8ff;
    padding: 5px;
  }
  .preview.markdown-body pre div span svg:hover {
    opacity: 1;
    stroke: #bfa8ff;
    backdrop-filter: blur(3px);
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }

  .preview.markdown-body th {
    background: #483d6b;
    border: 1px solid #53447e7d;
  }
  .preview.markdown-body td {
    background: #3b305a;
    border: 1px solid #53447e7d;
  }

  .preview.markdown-body blockquote {
    border-left: 0.25em solid #483d6b;
  }

  .preview.markdown-body ul {
    list-style: initial;
  }

  .preview.markdown-body ol {
    list-style: auto;
  }

  .markdown-body .footnotes li:target::before {
    border: 2px solid #9595d9;
  }
`;
