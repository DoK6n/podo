import { useCallback, useEffect } from 'react';
import { useCodemirror } from '@hooks';
import '@assets/css/editor.css';

function MarkdownEditor({ onChange, id, text, done }) {
  const handleChange = useCallback((state, id, done) => onChange(state.doc.toString(), id, done), [onChange]);

  const [refContainer, editorView] = useCodemirror({
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

export default MarkdownEditor;
