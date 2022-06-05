import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface State {
  id: string;
  content: Object | any; // TODO content: RemirrorJSON
  done: boolean;
}

interface TodoStore {
  todos: State[];
  getContentNormalTextFormat(action: { text: string }): Object | any;
  addItem(action: { text: string }): void;
  editItemText(action: { id: string; content: Object | any }): void;
  toggleItem(action: Partial<State>): void;
  dragItem(action: { draggingItemIndex: number; afterDragItemIndex: number }): void;
  removeItem(action: Partial<State>): void;
}

const contentNormalTextFormat = (text: string) => ({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: text }],
    },
  ],
});

const content00 = {
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
        emoji: '',
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
const content01 = {
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
        emoji: '',
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
const content02 = {
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
        emoji: '',
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
const content03 = {
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
        emoji: '',
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
const content04 = {
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
        emoji: '',
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

const initState: State[] = [
  { id: uuidv4(), content: content00, done: true },
  { id: uuidv4(), content: content01, done: false },
  { id: uuidv4(), content: content02, done: false },
  { id: uuidv4(), content: content03, done: false },
  { id: uuidv4(), content: content04, done: false },
];

export const useTodoStore = create<TodoStore>(set => ({
  todos: initState,
  getContentNormalTextFormat(action) {
    return contentNormalTextFormat(action.text);
  },
  addItem(action) {
    set(({ todos }) => ({
      todos: [...todos, { id: uuidv4(), content: contentNormalTextFormat(action.text), done: false }],
    }));
  },
  editItemText(action) {
    set(({ todos }) => ({
      todos: todos.map(todo => (todo.id === action.id ? { ...todo, content: action.content } : todo)),
    }));
  },
  toggleItem(action) {
    set(({ todos }) => ({
      todos: todos.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)),
    }));
  },
  dragItem(action) {
    set(({ todos }) => {
      const temp = [...todos];
      const draggingItem = temp.splice(action.draggingItemIndex, 1);
      temp.splice(action.afterDragItemIndex, 0, draggingItem[0]);
      return { todos: temp };
    });
  },
  removeItem(action) {
    set(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== action.id),
    }));
  },
}));
