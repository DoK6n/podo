import { css, MenuButtonStyledProps } from 'styled-components';
import { podoteColorsStyledCss } from 'styles';

export const accordionWrapperStyledCss: ReturnType<typeof css> = css<MenuButtonStyledProps>`
  ${podoteColorsStyledCss}
  outline-style: none;
  border-radius: 5px;
  border: 1px solid var(--podote-color-dark-2);
  color: var(--podote-color-heading-text);
  max-width: ${props => (props.isToggle ? '11em' : '0')};
  overflow: auto;
  white-space: nowrap;

  opacity: ${props => (props.isToggle ? '1' : '0')};
  transition: ${props =>
    props.isToggle ? 'all 0.5s ease, opacity 0s' : 'all 0.5s ease, opacity 0.3s ease, max-width 0.2s ease'};

  &::placeholder {
    color: var(--podote-color-normal-text);
  }
`;
