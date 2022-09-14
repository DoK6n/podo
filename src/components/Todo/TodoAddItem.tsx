import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { todoAddItemInputStyledCss } from 'styles';
import { useAuthStore } from 'lib/stores';
import styled from 'styled-components';
import { ADD_NEW_TODO } from 'lib/graphql/mutation';
import { useMutation } from '@apollo/client';
import { GET_USER_ALL_TODOS } from 'lib/graphql/query';
import { RemirrorJSON } from 'remirror';

const TodoAddItemInput = styled.input`
  ${todoAddItemInputStyledCss}
`;

const contentNormalTextFormat = (text: string): RemirrorJSON => ({
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: text,
        },
      ],
    },
  ],
});

function TodoAddItem() {
  const { currentUserInfo, mode } = useAuthStore();
  const addItemInputRef = useRef<HTMLInputElement>(null);
  const [addNewTodo] = useMutation(ADD_NEW_TODO);

  useEffect(() => {
    addItemInputRef?.current?.focus();
  }, []);

  const onAddItem = async (e: KeyboardEvent<HTMLInputElement>) => {
    /**
     * e : KeyboardEvent<HTMLInputElement>
     * -> 위처럼 지정시 e.target.value 사용 불가
     * 사용하려는 KeyboardEvent도 DOM 요소나 window 객체에서 발생할 수 있으므로,
     *  이론적으로는 event.target을 요소로 정의하는 것은 의미가 없습니다.
     * DOM 요소에 대한 이벤트라면 event.target을 안전하게 가정할 수 있습니다.
     * 타겟이되는 HTMLElement의 타입을 TypeScript에 명시 적으로 전달해야합니다.
     * 따라서 적절한 Element 유형으로 캐스팅해서 사용해야합니다.
     */
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value !== '') {
      if (!currentUserInfo || mode === 'GUEST_MODE') return;

      await addNewTodo({
        variables: {
          data: {
            content: contentNormalTextFormat(target.value),
          },
        },
        context: {
          headers: {
            uid: currentUserInfo?.uid,
          },
        },
        refetchQueries: [
          {
            query: GET_USER_ALL_TODOS,
            context: {
              headers: {
                uid: currentUserInfo?.uid,
              },
            },
          },
        ],
      });
      target.value = '';
    }
  };

  return (
    <React.Fragment>
      <TodoAddItemInput
        placeholder="내용 입력 후 Enter를 눌러 할일을 추가 할 수 있어요."
        onKeyUp={onAddItem}
        ref={addItemInputRef}
      />
    </React.Fragment>
  );
}

export default React.memo(TodoAddItem);
