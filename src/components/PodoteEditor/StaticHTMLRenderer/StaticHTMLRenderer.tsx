import { RemirrorRenderer } from '@remirror/react';
import { useEffect, useState } from 'react';
import { RemirrorJSON } from 'remirror';
import copy from 'fast-copy';
import styled from 'styled-components';
import { remirrorHTMLrendererStyledCss } from 'styles';

const RendererWrapper = styled.div`
  ${remirrorHTMLrendererStyledCss}
`;

interface Props {
  content: RemirrorJSON;
}

function StaticHTMLRenderer({ content }: Props) {
  /**
   * Static HTML Renderer 사용을 위해서 몇가지 작업이 필요합니다.
   *
   * Parameter로 받은 NodeType 객체를 일반 객체로 변형하거나 필요없는 속성을 제거하고,
   * 속성의 이름을 변경하는 등의 작업을 수행합니다.
   */
  const setMatchTypeContent = (con: RemirrorJSON) => {
    const matchTypeContent: RemirrorJSON = JSON.parse(JSON.stringify(copy(con)));

    matchTypeContent.content?.map(dc => {
      dc.content?.map(docContent => {
        if (docContent.type === 'image') {
          delete docContent.attrs?.resizable;
          if (docContent.attrs?.hasOwnProperty('fileName')) {
            docContent.attrs.filename = docContent.attrs.fileName;
            delete docContent.attrs.fileName;
          }
        }
        return docContent;
      });
      return dc;
    });
    return matchTypeContent;
  };

  const [doc, setDoc] = useState<RemirrorJSON>(setMatchTypeContent(content));
  useEffect(() => {
    setDoc(setMatchTypeContent(content));
  }, [content]);

  return (
    <RendererWrapper>
      <div className="remirror-editor-wrapper remirror-html-renderer-wrapper">
        <div className="ProseMirror remirror-editor remirror-html-renderer-editor">
          <RemirrorRenderer json={doc} />
        </div>
      </div>
    </RendererWrapper>
  );
}

export default StaticHTMLRenderer;
