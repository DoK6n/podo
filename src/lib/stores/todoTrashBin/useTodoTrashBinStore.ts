// import create from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
// import { immer } from 'zustand/middleware/immer';
// import dayjs from 'dayjs';
// import { Todo } from 'podote/interfaces';

// export interface RemovedTodo extends Required<Todo> {} // removedDt를 필수속성값으로 변경

// interface TodoTrashBinStore {
//   removedTodos: RemovedTodo[];
//   addRemovedTodos: (action: { todo: Todo }) => void;
//   findRemovedItemById: (action: { id: string }) => RemovedTodo;
//   deleteTodosById: (action: { id: string }) => void;
//   deleteAllTodos: () => void;
// }

// /**
//  * ## zustand 상태관리 라이브러리
//  * - zustand middleware
//  *    - devtools : 크롬 Redux DevTools에 적용
//  *    - persist : 로컬 스토리지에 저장
//  *    - immer : react 배열/객체 업데이트시 불변성 관리
//  *
//  * [휴지통] 삭제된 Todo List 관리
//  */
// export const useTodoTrashBinStore = create<TodoTrashBinStore>()(
//   devtools(
//     persist(
//       immer((set, get) => ({
//         removedTodos: [],
//         addRemovedTodos(action) {
//           // 휴지통에 목록 추가
//           set(({ removedTodos }) => {
//             const removedTodo = { ...action.todo, editable: false, removedDt: dayjs().format('YYYY-MM-DD HH:mm:ss') };
//             removedTodos.push(removedTodo);
//           });
//         },
//         findRemovedItemById(action) {
//           const removeTodo = get().removedTodos.find(removedItem => removedItem.id === action.id)!;
//           return removeTodo;
//         },
//         deleteTodosById(action) {
//           // 휴지통에서 목록 제거
//           set(({ removedTodos }) => {
//             const index = removedTodos.findIndex(removedTodo => removedTodo.id === action.id);
//             removedTodos.splice(index, 1);
//           });
//         },
//         deleteAllTodos() {
//           // 휴지통 비우기
//           set(state => {
//             state.removedTodos = [];
//           });
//         },
//       })),
//       { name: 'todo-trash-storage' },
//     ),
//   ),
// );
