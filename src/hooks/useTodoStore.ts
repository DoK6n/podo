import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { RemirrorJSON } from 'remirror';

interface Todo {
  id: string;
  content: RemirrorJSON;
  done: boolean;
  editable: boolean;
}

interface TodoStore {
  todos: Todo[];
  getContentNormalTextFormat(action: { text: string }): RemirrorJSON;
  addItem(action: { text: string }): void;
  editItemText(action: { id: string; content: RemirrorJSON }): void;
  setEditableById(action: { id: string }): void;
  toggleItem(action: Partial<Todo>): void;
  dragItem(action: { draggingItemIndex: number; afterDragItemIndex: number }): void;
  removeItem(action: Partial<Todo>): void;
}

const contentNormalTextFormat = (text: string): RemirrorJSON => ({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: text }],
    },
  ],
});

const content00: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'done',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'blank',
        emoji: '💡',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'BLANK',
            },
          ],
        },
      ],
    },
  ],
};
const content01: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content01',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'info',
        emoji: '💡',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'INFO',
            },
          ],
        },
      ],
    },
  ],
};
const content02: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content02',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'warning',
        emoji: '⚠️',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'WARNING',
            },
          ],
        },
      ],
    },
  ],
};
const content03: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content03',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'error',
        emoji: '🚨',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'ERROR',
            },
          ],
        },
      ],
    },
  ],
};
const content04: RemirrorJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Content04',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Simple ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text: 'Todo Memo App',
        },
      ],
    },
    {
      type: 'callout',
      attrs: {
        type: 'success',
        emoji: '✅',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'SUCCESS',
            },
          ],
        },
      ],
    },
  ],
};

const initState: Todo[] = [
  { id: uuidv4(), content: content00, done: true, editable: false },
  { id: uuidv4(), content: content01, done: false, editable: false },
  { id: uuidv4(), content: content02, done: false, editable: false },
  { id: uuidv4(), content: content03, done: false, editable: false },
  { id: uuidv4(), content: content04, done: false, editable: false },
];

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
        editItemText(action) {
          set(({ todos }) => {
            const todo = todos.find(todo => todo.id === action.id);
            todo!.content = action.content; // 해당 피연산자가 null, undeifned가 아니라고 단언
          });
        },
        setEditableById(action) {
          set(({ todos }) => {
            todos.forEach(todo => (todo.id === action.id ? (todo.editable = !todo.editable) : (todo.editable = false)));
          });
        },
        toggleItem(action) {
          set(({ todos }) => {
            const todo = todos.find(todo => todo.id === action.id);
            todo!.done = !todo?.done;
          });
        },
        dragItem(action) {
          set(({ todos }) => {
            const draggingItem = todos.splice(action.draggingItemIndex, 1);
            todos.splice(action.afterDragItemIndex, 0, draggingItem[0]);
          });
        },
        removeItem(action) {
          set(({ todos }) => {
            const index = todos.findIndex(todo => todo.id === action.id);
            todos.splice(index, 1);
          });
        },
      })),
    ),
  ),
);
