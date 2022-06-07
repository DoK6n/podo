import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

import 'github-markdown-css/github-markdown.css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import toast, { Toaster } from 'react-hot-toast';
import { FiCopy } from 'react-icons/fi';

import { CopyToClipboardWrapper } from 'components';
import { gruvboxDark, markdownViewStyledCss } from 'styles';
import styled, { css, TodoStylesProps } from 'styled-components';

export const MarkdownViewTheme = styled.div<TodoStylesProps>`
  ${markdownViewStyledCss}
`;

interface Props {
  doc: string;
  done: boolean;
  edited: boolean;
}

function MarkdownViewer({ doc, done, edited }: Props) {
  return (
    <div style={{ width: '100%', overflow: 'auto', display: !edited ? 'inline-block' : 'none' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <MarkdownViewTheme done={done} edited={edited}>
        <div className="preview markdown-body">
          <ReactMarkdown
            children={doc}
            remarkPlugins={[remarkGfm, remarkGemoji, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <CopyToClipboardWrapper
                    text={String(children)}
                    onSuccess={() => {
                      console.log('copy onSuccess!');
                      return toast.success('Copied to clipboard', {
                        style: {
                          borderRadius: '10px',
                          background: '#483d6b',
                          color: '#efeef3',
                        },
                        iconTheme: {
                          primary: '#9595d9',
                          secondary: '#efeef3',
                        },
                      });
                    }}
                    style={css`
                      cursor: pointer;
                      margin-top: 0.3rem;
                      &:active {
                        opacity: 0.1;
                      }
                    `}
                    button={<FiCopy size={16} />}
                  >
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={gruvboxDark as any}
                      customStyle={{
                        margin: '-1rem',
                        fontWeight: 'bold',
                        background: '#483d6b',
                      }}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  </CopyToClipboardWrapper>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </MarkdownViewTheme>
    </div>
  );
}

export default MarkdownViewer;
