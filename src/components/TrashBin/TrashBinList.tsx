import React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {}

const Table = styled.table`
  margin-left: 1em;
  margin-right: 1em;
  & > thead > tr {
    background: #483e6b;
    & th {
      padding: 0.6em;
      text-align: center;
    }
  }
  & tbody tr {
    color: lightgray;
    padding: 0 1em 0 1em;
  }
  & tbody td {
    border: 1px solid #4f4e4f;
    text-align: center;
  }
`;

function TrashList({ children }: PropsWithChildren<Props>) {
  return (
    <Table>
      <colgroup>
        <col width="50%" />
        <col width="20%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>Item</th>
          <th>삭제된 날짜</th>
          <th>상세 정보</th>
          <th>복원</th>
          <th>영구삭제</th>
        </tr>
      </thead>
      {children}
    </Table>
  );
}

export default TrashList;
