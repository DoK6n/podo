import React, { useCallback, useEffect } from 'react';
import { useCodemirror } from 'hooks';
import 'styles/MarkdownEditor/editor.css';
import { EditorState } from '@codemirror/state';

interface Props {
  onChange: (doc: string, id: string, done: boolean) => void;
  id: string;
  text: string;
  done: boolean;
}

function MarkdownEditor({ onChange, id, text, done }: Props) {
  const handleChange = useCallback(
    (state: EditorState, id: string, done: boolean) => onChange(state.doc.toString(), id, done),
    [onChange],
  );

  const [refContainer, editorView] = useCodemirror<HTMLDivElement>({
    initialDoc: text,
    onChange: handleChange,
    id,
    done,
  });

  useEffect(() => {
    if (editorView) {
      // TODO
    }
  }, [editorView]);
  return <div className="editor-wrapper" ref={refContainer}></div>;
}

export default React.memo(MarkdownEditor);
