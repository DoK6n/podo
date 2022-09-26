import React from 'react';
import { TrashBinWrapper, TrashBinList, TrashBinItem } from 'components';
import { useQuery } from '@apollo/client';
import { GET_USER_ALL_REMOVED_TODOS } from 'lib/graphql/query';
import { useAuthStore } from 'lib/stores';
import { Query } from 'lib/graphql/generated/graphql';

type RetrieveAllRemovedTodoType = Pick<Query, 'retrieveAllRemovedTodo'>;

function TrashBinPage() {
  const { currentUserInfo } = useAuthStore();

  const { data, loading, error } = useQuery<RetrieveAllRemovedTodoType>(GET_USER_ALL_REMOVED_TODOS, {
    context: {
      headers: {
        uid: currentUserInfo?.uid,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <TrashBinWrapper>
      <TrashBinList>
        {data && data.retrieveAllRemovedTodo
          ? data.retrieveAllRemovedTodo.map(removedTodo => (
              <TrashBinItem
                id={removedTodo.id}
                content={removedTodo.content}
                removedDt={removedTodo.removedDt}
                key={removedTodo.id}
              />
            ))
          : null}
      </TrashBinList>
    </TrashBinWrapper>
  );
}

export default TrashBinPage;
