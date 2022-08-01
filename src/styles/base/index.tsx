import { css } from 'styled-components';

export const headerStyledCss: ReturnType<typeof css> = css`
  background: #5c4b8c40;
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const logoNavStyledCss: ReturnType<typeof css> = css`
  width: auto;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
`;

export const navStyledCss: ReturnType<typeof css> = css`
  width: auto;
  height: 1.3em;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;
  padding: 0 10% 0 10%;
`;

export const podoteColorsStyledCss: ReturnType<typeof css> = css`
  --podote-color-heading-text: #c9d1d9;
  --podote-color-normal-text: #abb2bf;

  --podote-color-light-1: #9595d9;
  --podote-color-normal-1: #5f45c9d4;
  --podote-color-dark-1: #9480d979;
  --podote-color-dark-2: #605679;
  --podote-color-dark-3: #5a4d857b;
  --podote-color-dark-4: #483d6b;
`;
