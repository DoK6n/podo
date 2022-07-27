import { keyframes, css, TodoStylesProps } from 'styled-components';

export const todoTemplateStyledCss: ReturnType<typeof css> = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`;

export const todoListBlockStyledCss: ReturnType<typeof css> = css`
  width: 80%;
  height: 70vh;
  border-radius: 17px;
  overflow-y: auto;
  overflow: overlay;
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    background: radial-gradient(#5c4b8c95, #3b305a);
    border-radius: 8px;
  }
`;

const blinkingEffect = () => keyframes`
  50% {
    border: 1px dotted #483d6b;
  }
`;

export const todoItemBlockStyledCss: ReturnType<typeof css> = css<TodoStylesProps>`
  ${({ editable, done }) =>
    editable === true &&
    done === false &&
    css`
      animation: ${blinkingEffect} 0.7s linear infinite;
    `}
  height: auto;
  padding: 0 10px 0 10px;
  border: 1px solid ${({ done }) => (done === false ? '#9595d9' : '#5c4b8c95')};
  color: ${({ done }) => (done === false ? '#efeef3' : '#5c4b8c95')};
  border-radius: 17px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #836cc90f;
  }
`;

export const itemBlockLeftIconWrapperStyledCss: ReturnType<typeof css> = css`
  display: flex;
  align-items: stretch;
`;

export const dragHandleIconStyledCss: ReturnType<typeof css> = css`
  opacity: 0;
  color: #efeef3;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 1;
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }
`;

export const checkIconStyledCss: ReturnType<typeof css> = css<TodoStylesProps>`
  opacity: ${({ done }) => (done === false ? '1' : '0.1')};
  color: #bfa8ff;
  cursor: pointer;

  &:hover {
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }
`;

export const editIconStyledCss: ReturnType<typeof css> = css`
  opacity: 0.1;
  color: #bfa8ff;
  cursor: pointer;
  &:hover {
    opacity: 1;
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }
`;

export const removeIconStyledCss: ReturnType<typeof css> = css`
  opacity: 0.1;
  &:hover {
    cursor: pointer;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }
`;

export const itemTextStyledCss: ReturnType<typeof css> = css<TodoStylesProps>`
  opacity: ${({ done }) => (done === false ? '1' : '0.1')};
  width: 100%;
  margin: 0 10px 0 10px;
  padding: 10px 0 10px 0;
  overflow: auto;
`;

export const todoAddItemInputStyledCss: ReturnType<typeof css> = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #efeef3;

  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.2em;
  padding: 0 0 5px 20px;
  margin: 0 40px 0 40px;

  width: 60%;
  height: 50px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #5c4b8c8e;
  }
  :-ms-input-placeholder {
    color: #5c4b8c8e;
  }
`;
