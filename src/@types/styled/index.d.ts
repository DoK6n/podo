import 'styled-components';
import 'react-syntax-highlighter';

declare module 'styled-components' {
  interface TodoStylesProps {
    editable?: boolean;
    done?: boolean;
  }

  interface MenuButtonStyledProps {
    isActive?: boolean;
    done?: boolean;
    isToggle?: boolean;
  }
}

declare module 'react-syntax-highlighter' {
  export interface SyntaxHighlighterProps {
    language?: string | undefined;
    style?: CSSProperties | { [key: string]: React.CSSProperties } | undefined;
    children: string | string[];
    customStyle?: React.CSSProperties | undefined;
    codeTagProps?: React.HTMLProps<HTMLElement> | undefined;
    useInlineStyles?: boolean | undefined;
    showLineNumbers?: boolean | undefined;
    showInlineLineNumbers?: boolean | undefined;
    startingLineNumber?: number | undefined;
    lineNumberContainerStyle?: React.CSSProperties | undefined;
    lineNumberStyle?: React.CSSProperties | lineNumberStyleFunction | undefined;
    wrapLines?: boolean | undefined;
    wrapLongLines?: boolean | undefined;
    lineProps?: lineTagPropsFunction | React.HTMLProps<HTMLElement> | undefined;
    renderer?: (props: rendererProps) => React.ReactNode;
    PreTag?: keyof JSX.IntrinsicElements | React.ComponentType<any> | undefined;
    CodeTag?: keyof JSX.IntrinsicElements | React.ComponentType<any> | undefined;
    [spread: string]: any;
  }
}
