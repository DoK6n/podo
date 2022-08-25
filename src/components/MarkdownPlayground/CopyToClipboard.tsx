import ClipboardJS from 'clipboard';
import { PropsWithChildren, useEffect, useRef } from 'react';
import styled, { css, FlattenInterpolation, Interpolation, ThemedStyledProps } from 'styled-components';

interface StylesProps {
  styledCss: FlattenInterpolation<ThemedStyledProps<object, any>> | Interpolation<ThemedStyledProps<object, any>>;
}

const StyledCopyToClipboardButton = styled.span<StylesProps>`
  ${({ styledCss }) => styledCss}
`;

type CopyToClipboardProps = {
  text: string;
  onSuccess?: (e: ClipboardJS.Event) => void;
  onError?: (e: ClipboardJS.Event) => void;
  style?: FlattenInterpolation<ThemedStyledProps<object, any>>;
  className?: string;
  title?: string;
  // children?: React.ReactNode;
};

export function CopyToClipboardButton(props: PropsWithChildren<CopyToClipboardProps>) {
  const ref = useRef() as React.MutableRefObject<HTMLSpanElement>;

  useEffect(() => {
    if (ref) {
      const clipboard = new ClipboardJS(ref.current, {
        text: () => props.text,
      });

      clipboard.on('success', e => props.onSuccess?.(e));
      clipboard.on('error', e => props.onError?.(e));

      return () => {
        try {
          clipboard.destroy();
        } catch (e) {}
      };
    }
  }, [ref.current]);

  return (
    <StyledCopyToClipboardButton styledCss={props.style}>
      <span ref={ref} className={props.className} title={props.title}>
        {props.children}
      </span>
    </StyledCopyToClipboardButton>
  );
}

type CopyToClipboardWrapperProps = CopyToClipboardProps & {
  button?: React.ReactNode;
};

export function CopyToClipboardWrapper(props: PropsWithChildren<CopyToClipboardWrapperProps>) {
  const buttonStyledCss: ReturnType<typeof css> = css`
    position: absolute;
    top: 5px;
    right: 5px;
    ${props.style}
  `;

  return (
    <div style={{ position: 'relative' }}>
      <CopyToClipboardButton {...props} style={buttonStyledCss}>
        {props.button}
      </CopyToClipboardButton>
      {props.children}
    </div>
  );
}
