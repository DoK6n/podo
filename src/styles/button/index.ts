import { css } from 'styled-components';

export const buttonStyledCss: ReturnType<typeof css> = css`
  background: #3e2f6767;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
  padding: 4px;
  margin-left: 4px;
  margin-right: 4px;
  cursor: pointer;
  box-shadow: #2a204667 5px 5px 10px 1px;
  &:active {
    background-color: #34275867;
    box-shadow: #2a204667 -5px -5px 10px 1px;
  }
`;
