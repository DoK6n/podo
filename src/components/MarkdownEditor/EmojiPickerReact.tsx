import React, { useCallback, useEffect, useRef } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useCommands, useRemirrorContext } from '@remirror/react';
import Dialog from 'components/common/Dialog';
import { emojiPickerPodoteThemeStyledCss } from 'styles';
import styled from 'styled-components';

const EmojiPickerPodoteTheme = styled.div`
  ${emojiPickerPodoteThemeStyledCss}
`;

interface Props {
  itemId: string;
  editable: boolean;
  chosenEmoji: IEmojiData | null;
  setChosenEmoji: any | Object;
}

function EmojiPickerReact({ itemId, editable, chosenEmoji, setChosenEmoji }: Props) {
  const { updateCallout } = useCommands();
  const { view } = useRemirrorContext();
  const dialogRef = useRef<any>();
  const pos = useRef(-1); // 에디터 내에 커서의 위치

  const onEmojiClick = (e: React.MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
    updateCallout({ emoji: emojiObject.emoji }, pos.current);
  };

  // emoji 클릭시 picker toggle. 에디터 내에 현재 포지션을 pos(ref 객체)에 update
  const handleClickEmoji = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      e.preventDefault();
      //
      if (target === dialogRef.current) {
        dialogRef.current.close();
      }

      if (!(target.dataset.id === itemId)) return;
      if (!target.matches('[data-emoji-container]')) return;

      pos.current = view.posAtDOM(target, 0);
      dialogRef.current.showModal();
    },
    [view],
  );

  useEffect(() => {
    // }
    document.addEventListener('click', handleClickEmoji);
    return () => {
      document.removeEventListener('click', handleClickEmoji);
      console.log('remove');
    };
  }, [handleClickEmoji]);

  return (
    <Dialog dialogRef={dialogRef} editable={editable}>
      <EmojiPickerPodoteTheme>
        <Picker //
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          disableSearchBar={true}
        />
      </EmojiPickerPodoteTheme>
    </Dialog>
  );
}

export default EmojiPickerReact;
