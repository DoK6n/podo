import React from 'react';
import { useTodoTrashBinStore } from 'lib/stores';
import { TrashBinWrapper, TrashBinList, TrashBinItem } from 'components';

function TrashBinPage() {
  const { removedTodos } = useTodoTrashBinStore();

  return (
    <>
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

export default TrashBinPage;
