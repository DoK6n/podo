declare module 'podote/types' {
  export type UseEditorType = 'TODO_ITEM' | 'TRASH_VIEW' | 'TEST_PAGE';
}

declare module 'podote/interfaces' {
  import { RemirrorJSON } from 'remirror';
  export interface Todo {
    id: string;
    content: RemirrorJSON;
    done: boolean;
    editable: boolean;
    removedDt?: string;
    orderKey: number;
  }
}
