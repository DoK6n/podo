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
  }
`;
