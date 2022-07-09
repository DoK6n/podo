import { CommandFunction } from '@remirror/core';
// import { EditorState, Selection, Transaction } from '@remirror/pm/state';
import { EditorState, Transaction, Selection } from 'prosemirror-state';

import { Schema } from '@remirror/pm/model';

/**
 * Handling cursor motion from the outer to the inner editor must be done with a
 * keymap on the outer editor. The `arrowHandler` function uses the
 * `endOfTextblock` method to determine, in a bidi-text-aware way, whether the
 * cursor is at the end of a given textblock. If it is, and the next block is a
 * code block, the selection is moved into it.
 *
 * Adapted from https://prosemirror.net/examples/codemirror/
 */
export function arrowHandler(dir: 'left' | 'right' | 'up' | 'down'): CommandFunction {
  return ({ dispatch, view, tr }) => {
    if (!view) {
      return false;
    }

    if (!(tr.selection.empty && view.endOfTextblock(dir))) {
      return false;
    }

    const side = dir === 'left' || dir === 'up' ? -1 : 1;
    const $head = tr.selection.$head;
    const nextPos = Selection.near(tr.doc.resolve(side > 0 ? $head.after() : $head.before()), side);

    if (nextPos.$head && nextPos.$head.parent.type.name === 'codeMirror') {
      dispatch?.(tr.setSelection(nextPos));
      return true;
    }

    return false;
  };
}

// :: (EditorState, ?(tr: Transaction)) → bool
// When the selection is in a node with a truthy
// [`code`](#model.NodeSpec.code) property in its spec, create a
// default block after the code block, and move the cursor there.
function defaultBlockAt(match: any) {
  for (let i = 0; i < match.edgeCount; i++) {
    let { type } = match.edge(i);
    if (type.isTextblock && !type.hasRequiredAttrs()) return type;
  }
  return null;
}

/**
 *
 * When the selection is in a node with a truthy
 * [`code`](#model.NodeSpec.code) property in its spec, create a
 * default block before the code block, and move the cursor there
 *
 * 선택 항목이 true인 노드에 있을 때
 * 해당 사양의 [`code`](#model.NodeSpec.code) 속성은
 * 코드 블록 앞의 기본 블록, 커서를 그곳으로 이동
 */
export function exitCodeBefore(state: EditorState, dispatch?: ((tr: Transaction) => void) | undefined): boolean {
  let { $head, $anchor } = state.selection;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
  let above = $head.node(-1),
    after = $head.indexAfter(-1),
    type = defaultBlockAt(above.contentMatchAt(after));
  if (!above.canReplaceWith(after, after, type)) return false;
  if (dispatch) {
    let pos = $head.start() - 1;
    let tr = state.tr.replaceWith(pos, pos, type.createAndFill());
    tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
    dispatch(tr.scrollIntoView());
  }
  return true;
}
