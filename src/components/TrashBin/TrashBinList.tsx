import React from 'react';
import { PropsWithChildren } from 'react';

interface Props {}

function TrashList({ children }: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid rebeccapurple',
      }}
    >
      {children}
    </div>
  );
}

export default TrashList;
