import React, { useCallback, useEffect } from 'react';
import { useCodemirror } from 'lib/hooks';
import { EditorState } from '@codemirror/state';
import { markdownPlaygroundEditorStyledCss } from 'styles';
import styled from 'styled-components';

const MDPlaygroundEditorTheme = styled.div`
  ${markdownPlaygroundEditorStyledCss}
`;

interface Props {
  onChange: (doc: string, id: string, done: boolean) => void;
  id: string;
  text: string;
  done: boolean;
}

function MarkdownPlaygroundEditor({ onChange, id, text, done }: Props) {
  const handleChange = useCallback(
    (state: EditorState, id: string, done: boolean) => onChange(state.doc.toString(), id, done),
    [onChange]
  );

  const [refContainer, editorView] = useCodemirror<HTMLDivElement>({
    initialDoc: text,
    onChange: handleChange,
    id,
    done
  });

  useEffect(() => {
    if (editorView) {
      // TODO
    }
  }, [editorView]);
  return (
    <MDPlaygroundEditorTheme>
      <div className="editor-wrapper" ref={refContainer}></div>
    </MDPlaygroundEditorTheme>
  );
}

export default React.memo(MarkdownPlaygroundEditor);
