import React from 'react';
import { useTodoTrashBinStore } from 'hooks';
import { TrashBinWrapper, TrashBinList, TrashBinItem } from 'components';

function TrashPage() {
  const { removedTodos } = useTodoTrashBinStore();

  return (
    <>
      <h1>휴지통</h1>
      <TrashBinWrapper>
        <TrashBinList>
          {removedTodos.map(removedTodo => (
            <TrashBinItem
              id={removedTodo.id}
              content={removedTodo.content}
              removedDt={removedTodo.removedDt}
              key={removedTodo.id}
            />
          ))}
        </TrashBinList>
      </TrashBinWrapper>
    </>
  );
}

export default TrashPage;
