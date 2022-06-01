import styled, { TodoStylesProps } from 'styled-components';

export const MarkdownView = styled.div<TodoStylesProps>`
  opacity: ${({ done }) => (done === false ? '1' : '0.1')};
  display: ${({ edited }) => (edited ? 'none' : 'inline-block')};
`;