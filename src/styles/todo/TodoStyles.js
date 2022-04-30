import styled from 'styled-components';

export const TodoTemplateBlock = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3vh;
`;

export const TodoListBlock = styled.article`
  width: 60%;
  height: 70vh;
  /* border: 1px solid #5c4b8c8e; */
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

export const TodoItemBlock = styled.section`
  height: auto;
  padding: 0 10px 0 10px;
  border: 1px solid ${({ done }) => (done === false ? '#9595d9' : '#5c4b8c95')};
  color: ${({ done }) => (done === false ? '#efeef3' : '#5c4b8c95')};
  border-radius: 17px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  &:hover {
    background: #483d6b;
  }
`;

export const CheckIcon = styled.span`
  opacity: ${({ done }) => (done === false ? '1' : '0.1')};
  color: #bfa8ff;
  cursor: pointer;

  &:hover {
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }
`;

export const RemoveIcon = styled.span`
  opacity: 0.1;
  &:hover {
    cursor: pointer;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease-in-out 0s;
    transition: opacity 0.25s ease-in-out 0s;
  }
`;

export const ItemText = styled.div`
  width: 100%;
  margin-left: 10px;
  padding: 10px 0 10px 0;
`;

export const TodoAddItemInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #efeef3;

  border-left: none;
  border-right: none;
  border-top: none;
  border-color: #9595d9;
  outline: none;
  background-color: transparent;
  font-size: 1.5em;
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
