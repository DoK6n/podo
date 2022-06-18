import { css } from 'styled-components';

export const emojiPickerPodoteThemeStyledCss: ReturnType<typeof css> = css`
  aside.emoji-picker-react {
    background: #3b305a;
    border: 1px solid #9595d9;
    & .emoji-categories {
      filter: invert(100%);
    }
    & .emoji-group:before {
      background: #3b305afb;
    }
    & .active-category-indicator-wrapper .active-category-indicator {
      background: #9595d9;
    }
    & .emoji-scroll-wrapper::-webkit-scrollbar {
      display: none;
    }
    & .content-wrapper .variations-wrapper .variation-list.visible {
      background: #2e2548;
      border-bottom: 1px solid #2e2548;
    }
  }
`;
