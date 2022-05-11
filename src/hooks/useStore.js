import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const initState = [
  { id: uuidv4(), text: '조깅하기', done: true },
  { id: uuidv4(), text: '리액트 공부', done: false },
  { id: uuidv4(), text: '오마카세 먹기', done: false },
];

export const useTodoStore = create(set => ({
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
