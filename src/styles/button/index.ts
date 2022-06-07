import { css } from 'styled-components';

export const buttonStyledCss: ReturnType<typeof css> = css`
  background: transparent;
  font-size: 1.2em;
  border: none;
  border-radius: 4px;
  padding: 4px;
  margin-left: 4px;
  margin-right: 4px;
  &:hover {
    background-color: #57448da4;
  }
  &:active {
    background-color: #57448d28;
  }
`;
