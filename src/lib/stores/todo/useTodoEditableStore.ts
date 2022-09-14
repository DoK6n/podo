import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TodoEditable {
  id: string;
  editable: boolean;
}

interface TodoEditableStore {
  todosEditable: TodoEditable[];
  // findItemById(action: { id: string }): Todo;
  setTodosId: (action: { todosId: TodoEditable[] }) => void;
  setEditableById: (action: { id: string }) => void;
}

const initState: TodoEditable[] = [];

export const useTodoEditableStore = create<TodoEditableStore>()(
  devtools(
    immer((set, get) => ({
      todosEditable: initState,
      // findItemById(action) {
      //   // id값으로 할일 조회
      //   const todo = get().todos.todosEditable(todo => todo.id === action.id)!;
      //   return todo;
      // },
      setTodosId: action => {
        // 서버에서 조회한 todo list의 id값들 저장
        set(({ todosEditable }) => {
          action.todosId.forEach(todo => {
            todosEditable.push({ id: todo.id, editable: false });
          });
        });
      },
      setEditableById: action => {
        // 할일 수정모드 설정
        set(({ todosEditable }) => {
          todosEditable.forEach(todo =>
            todo.id === action.id ? (todo.editable = !todo.editable) : (todo.editable = false),
          );
        });
      },
    })),
  ),
);
