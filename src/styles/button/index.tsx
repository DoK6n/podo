import { css } from 'styled-components';
import { podoteColorsStyledCss } from 'styles';

export const buttonStyledCss: ReturnType<typeof css> = css`
  ${podoteColorsStyledCss}
  cursor: pointer;
  background: transparent;
  color: var(--podote-color-normal-text);
  font-size: 1em;
  box-shadow: none;
  border: none;
  border-radius: 0px;
  &:active {
    opacity: 0.5;
  }
  &:hover {
    color: #9894a7;
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
