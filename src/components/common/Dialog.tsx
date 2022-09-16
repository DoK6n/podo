import styled from 'styled-components';
import { MutableRefObject, PropsWithChildren } from 'react';

interface DialogStyledProps {
  background?: string;
  width?: string;
  textAlign?: string;
}

const DialogStyled = styled.dialog<DialogStyledProps>`
  border: none;
  border-radius: 10px;
  background: ${props => (props.background ? props.background : null)};
  width: ${props => (props.width ? props.width : null)};
  text-align: ${props => (props.textAlign ? props.textAlign : null)};
  & > .dialog-contents {
    margin: -1em;
    border: 1px solid;
  }
  &::backdrop {
    backdrop-filter: blur(1px);
    background: rgb(0 0 0 / 50%);
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;

interface Props {
  dialogRef: MutableRefObject<any>;
  editable: boolean;
  styleOptions?: DialogStyledProps;
}

function Dialog({ dialogRef, editable, styleOptions, children }: PropsWithChildren<Props>) {
  const handleOutsideClick = (e: any) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <DialogStyled ref={dialogRef} onClick={handleOutsideClick} {...styleOptions}>
      <div className={'dialog-contents'}>{children}</div>
    </DialogStyled>
  );
}

export default Dialog;
