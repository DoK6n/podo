import styled from 'styled-components';
import { MutableRefObject, useCallback } from 'react';
import { useRemirrorContext } from '@remirror/react';

const DialogStyled = styled.dialog`
  border: none;
  border-radius: 10px;

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
  children: React.ReactNode;
}

function Dialog({ dialogRef, editable, children }: Props) {
  const handleOutsideClick = (e: any) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <DialogStyled ref={dialogRef} onClick={handleOutsideClick}>
      <div className={'dialog-contents'}>{children}</div>
    </DialogStyled>
  );
}

export default Dialog;
