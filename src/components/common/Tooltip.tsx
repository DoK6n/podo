import React from 'react';
import { Tooltip as MuiToolTip, Zoom } from '@mui/material';
import styled from 'styled-components';
import { useHelpers } from '@remirror/react-core';
import {
  CommandDecoratorShortcut,
  isArray,
  isEqual,
  isString,
  ProsemirrorAttributes,
  DEFAULT_SHORTCUTS, // remirror의 기본 단축키 설정값
  getShortcutSymbols,
} from '@remirror/core';

export interface TooltipDescriptionOptionProps {
  title: string;
  commandName?: string;
  attrs?: ProsemirrorAttributes;
}
interface Props {
  children: React.ReactElement<any, any>;
  options: TooltipDescriptionOptionProps;
}

const CustomTooltip = styled(props => <MuiToolTip classes={{ popper: props.className }} {...props} />)`
  & .MuiTooltip-tooltip {
    background: #4d436c;
    color: #abb2bf;
    & .MuiTooltip-arrow {
      color: rgb(77, 67, 108);
    }
  }
`;
function isStringArray(array: unknown[]): array is string[] {
  return isString(array[0]);
}

// 일반적으로 string이지만 Heading의 경우 단축키 정보에서 shortcut의 값이 lenth가 6인 배열이므로 해당하는 단축키값을 알맞게 가져오기 위한 함수
function getUiShortcutString(uiShortcut: CommandDecoratorShortcut = '', attrs: ProsemirrorAttributes = {}): string {
  if (isString(uiShortcut)) {
    return uiShortcut;
  }

  if (!isArray(uiShortcut)) {
    return uiShortcut.shortcut;
  }

  if (isStringArray(uiShortcut)) {
    return uiShortcut[0];
  }

  return (uiShortcut.find(shortcut => isEqual(shortcut.attrs, attrs)) ?? uiShortcut[0])?.shortcut ?? '';
}
// 에디터 메뉴바의 단축키 툴팁
export function Tooltip({ children, options }: Props) {
  const { title, commandName: name = '', attrs } = options;
  const { getCommandOptions } = useHelpers();

  const commandOptions = getCommandOptions(name); // 에디터 확장기능의 단축키 관련 데이터
  const getShortcut = getUiShortcutString(commandOptions?.shortcut, attrs ?? {});
  const menuShortcut = name ? getShortcut : '';
  const headingLevel = commandOptions?.name === 'heading' && attrs?.level ? attrs.level : '';

  const resultShortcut = getShortcutSymbols(menuShortcut).map(shortcut => {
    if (shortcut.type === 'modifier') {
      // (mac, window) command, ctrl, option 등
      return shortcut.symbol;
    } else if (shortcut.type === 'char') {
      return shortcut.key;
    }
    return '';
  });

  const tooltipDescription = getShortcut ? `${title}${headingLevel} (${resultShortcut.join(' ')})` : `${title}`;

  return (
    <CustomTooltip
      title={tooltipDescription ? tooltipDescription : 'Description does not exist.'}
      children={children}
      TransitionComponent={Zoom}
      arrow
    />
  );
}
