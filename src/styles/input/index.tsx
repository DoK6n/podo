import { css, MenuButtonStyledProps } from 'styled-components';
import { podoteColorsStyledCss } from 'styles';

export const inputStyledCss: ReturnType<typeof css> = css`
  ${podoteColorsStyledCss}
  outline-style: none;
  border-radius: 5px;
  background-color: var(--podote-color-dark-2);
  border: 1px solid var(--podote-color-light-1);
  color: var(--podote-color-heading-text);
  padding: 0.2em 0.5em 0.2em 0.5em;
  &::placeholder {
    color: var(--podote-color-normal-text);
  }
`;

export const toggleInputStyledCss: ReturnType<typeof css> = css<MenuButtonStyledProps>`
  ${inputStyledCss}
  padding: ${props => (props.isToggle ? '0.2em 0.5em 0.2em 0.5em' : '0')};
  border-width: ${props => (props.isToggle ? '1px' : '0')};
  width: ${props => (props.isToggle ? '10em' : '0')};
  opacity: ${props => (props.isToggle ? '1' : '0')};
  transition: ${props =>
    props.isToggle
      ? 'all 0.5s ease, opacity 0s, padding 0.1s, border-width 0.1s'
      : 'all 0.4s ease, opacity 0.5s ease, padding 0.2s linear 0.2s, border-width 0.2s linear 0.2s'};
`;
