import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { WritableDraft } from 'immer/dist/internal';
import { RemirrorJSON } from 'remirror';
import { Todo } from 'podote/interfaces';
import { initState } from './initState';

interface TodoStore {
  todos: Todo[];
  getContentNormalTextFormat(action: { text: string }): RemirrorJSON;
  addItem(action: { text: string }): void;
  recycleItem(action: { todo: Todo }): void;
  findItemById(action: { id: string }): Todo;
  editItemText(action: { id: string; content: RemirrorJSON }): void;
  setEditableById(action: { id: string }): void;
  toggleItem(action: { id: string }): void;
  dragItem(action: { draggingItemIndex: number; afterDragItemIndex: number }): void;
  removeItem(action: { id: string }): void;
}

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

/**
 * ## zustand 상태관리 라이브러리
 * - zustand middleware
 *    - devtools : 크롬 Redux DevTools에 적용
 *    - persist : 로컬 스토리지에 저장
 *    - immer : react 배열/객체 업데이트시 불변성 관리
 *
 * Todo Contents 상태값 관리
 */
export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        todos: initState,
        getContentNormalTextFormat(action) {
          return contentNormalTextFormat(action.text);
        },
        addItem(action) {
          // 할일 추가
          set(({ todos }) => {
            const newItemId = uuidv4();
            todos.unshift({
              id: newItemId,
              content: contentNormalTextFormat(action.text),
              done: false,
              editable: true,
            });
            todos.forEach(todo => {
              if (todo.id !== newItemId) {
                todo.editable = false;
              }
            });
          });
        },
        recycleItem(action) {
          set(({ todos }) => {
            todos.push(action.todo);
          });
        },
        findItemById(action) {
          // id값으로 할일 조회
          const todo = get().todos.find(todo => todo.id === action.id)!;
          return todo;
        },
        editItemText(action) {
          // 할일 내용 수정
          set(({ todos }) => {
            const todo = todos.find(todo => todo.id === action.id);
            todo!.content = action.content; // 해당 피연산자가 null, undeifned가 아니라고 단언
          });
        },
        setEditableById(action) {
          // 할일 수정모드 설정
          set(({ todos }) => {
            todos.forEach(todo => (todo.id === action.id ? (todo.editable = !todo.editable) : (todo.editable = false)));
          });
        },
        toggleItem(action) {
          // 할일/완료 토글, 완료된 할일은 목록의 최하단으로 이동
          set(({ todos }) => {
            const findById = (todo: WritableDraft<Todo>) => todo.id === action.id;

            const todo = todos.find(findById);
            todo!.done = !todo?.done;

            const index = todos.findIndex(findById);
            if (todo?.done === true) {
              // todo 배열에서 토글된 item 제거 후 배열의 맨 뒤로 이동
              const todoWithDoneRemoved = todos.splice(index, 1); // splice의 return 값은 삭제한 값 array
              todos.splice(todos.length, 0, todoWithDoneRemoved[0]); // 3번쨰 인자값을 1번째 인자값 위치로 이동
            }
          });
        },
        dragItem(action) {
          // 할일 드래그 앤 드롭
          set(({ todos }) => {
            const draggingItem = todos.splice(action.draggingItemIndex, 1);
            todos.splice(action.afterDragItemIndex, 0, draggingItem[0]);
          });
        },
        removeItem(action) {
          // 목록에서 할일 제거
          set(({ todos }) => {
            const index = todos.findIndex(todo => todo.id === action.id);
            todos.splice(index, 1);
          });
        },
      })),
      { name: 'todo-storage' },
    ),
  ),
);
