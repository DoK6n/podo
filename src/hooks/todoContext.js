import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initState = [
  { id: uuidv4(), text: '퇴사 준비', done: true },
  { id: uuidv4(), text: '리액트 공부', done: false },
];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.concat({ id: uuidv4(), text: action.text, done: false });
    case 'TOGGLE_ITEM':
      return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE_ITEM':
      return state.filter(todo => todo.id !== action.id);
    case 'DRAG_ITEM':
      const temp = [...state];
      const draggingItem = temp.splice(action.draggingItemIndex, 1);
      temp.splice(action.afterDragItemIndex, 0, draggingItem[0]);
      return temp;
    default:
      throw Error('unhandled Action Type.');
  }
}

const TodoContext = createContext(null);
const TodoDispatchContext = createContext(null);

export function TodoStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <TodoContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

export function useTodoState() {
  const state = useContext(TodoContext);
  return state;
}

export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  return dispatch;
}
