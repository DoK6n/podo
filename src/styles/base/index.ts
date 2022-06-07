import { css } from 'styled-components';

export const headerStyledCss: ReturnType<typeof css> = css`
  background: #5c4b8c40;
  width: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const navStyledCss: ReturnType<typeof css> = css`
  width: auto;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
`;
