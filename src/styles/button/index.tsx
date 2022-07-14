import { css } from 'styled-components';
import { podoteColorsStyledCss } from 'styles';

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

export const menuButtonStyledCss: ReturnType<typeof css> = css`
  ${podoteColorsStyledCss}
  background: transparent;
  color: #abb2bf;
  border: none;
  font-size: 1.2em;
  padding: 4px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--podote-color-dark-4);
    color: var(--podote-color-heading-text);
  }
`;
