import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface State {
  id: string;
  text: string;
  done: boolean;
}

interface TodoStore {
  todos: State[];
  addItem(action: { text: string }): void;
  editItemText(action: { id: string; text: string }): void;
  toggleItem(action: Partial<State>): void;
  dragItem(action: { draggingItemIndex: number; afterDragItemIndex: number }): void;
  removeItem(action: Partial<State>): void;
}
// const foo = bar => bar++;

// console.log(foo(5));

const text1 = `
# Heading 1
\`\`\`js
const foo = bar => bar++;
console.log(foo(5));
\`\`\`
`;

const text2 = `
\`podote\` using markdown editor
`;

const text3 = `
## Tables
Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3
`;

const text4 = `
## Youtube
<iframe width="320" height="180" src="https://www.youtube.com/embed/EsCP2xLuUM8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

const initState: State[] = [
  { id: uuidv4(), text: 'done', done: true },
  { id: uuidv4(), text: text1, done: false },
  { id: uuidv4(), text: text2, done: false },
  { id: uuidv4(), text: text3, done: false },
  { id: uuidv4(), text: text4, done: false },
];

export const useTodoStore = create<TodoStore>(set => ({
  todos: initState,
  addItem(action) {
    set(({ todos }) => ({
      todos: [...todos, { id: uuidv4(), text: action.text, done: false }],
    }));
  },
  editItemText(action) {
    set(({ todos }) => ({
      todos: todos.map(todo => (todo.id === action.id ? { ...todo, text: action.text } : todo)),
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
