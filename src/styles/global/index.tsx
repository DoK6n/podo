import { css } from 'styled-components';
import reset from 'styled-reset';

export const globalStyledCss: ReturnType<typeof css> = css`
  ${reset}
  body {
    background: #3b305a;
    color: #e9ecef;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb:vertical {
      background: radial-gradient(#5c4b8c95, #3b305a);
      border-radius: 8px;
    }
  }
`;
