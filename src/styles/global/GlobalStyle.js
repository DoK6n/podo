import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    /* background: #6767af; */
    /* background: #5c4b8c; */
    background: #3b305a;
    /* border: 2px solid tomato; */
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
