import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
// import { history, historyKeymap } from '@codemirror/history';
// import { indentOnInput } from '@codemirror/language';
// import { bracketMatching } from '@codemirror/matchbrackets';

// import { highlightActiveLineGutter, lineNumbers } from '@codemirror/gutter';
// import { defaultHighlightStyle, HighlightStyle, tags } from '@codemirror/highlight';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
// import { oneDark } from '@codemirror/theme-one-dark';
import { languages } from '@codemirror/language-data';
import { useEffect, useRef, useState } from 'react';

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
  },
});

// const syntaxhighlighting = HighlightStyle.define([
//   {
//     tag: tags.heading1,
//     fontsize: '1.6em',
//     fontWeight: 'bold',
//   },
//   {
//     tag: tags.heading2,
//     fontsize: '1.4em',
//     fontWeight: 'bold',
//   },
//   {
//     tag: tags.heading3,
//     fontsize: '1.2em',
//     fontWeight: 'bold',
//   },
// ]);

interface Props {
  initialDoc: string;
  onChange?: (state: EditorState, id: string, done: boolean) => void;
  id: string;
  done: boolean;
}

export const useCodemirror = <T extends Element>({
  initialDoc,
  onChange,
  id,
  done,
}: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const [editorView, setEditorView] = useState<EditorView>();

  const refContainer = useRef<T>(null);

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        keymap.of(defaultKeymap),
        // lineNumbers(),
        // highlightActiveLineGutter(),
        // history(),
        // indentOnInput(),
        // bracketMatching(),
        // defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        // oneDark,
        transparentTheme,
        // syntaxhighlighting,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state, id, done);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);
  }, [refContainer]);

  return [refContainer, editorView];
};
