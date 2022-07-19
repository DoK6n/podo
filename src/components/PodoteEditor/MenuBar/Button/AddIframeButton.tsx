import { useCommands } from '@remirror/react';
import { default as MenuButton } from './MenuButton';
import React, { useRef, useState, useCallback } from 'react';
import { MdImageSearch } from 'react-icons/md';
import styled, { MenuButtonStyledProps } from 'styled-components';
import { menuFormStyledCss, toggleInputStyledCss } from 'styles';

const MenuInput = styled.input<MenuButtonStyledProps>`
  ${toggleInputStyledCss}
`;
const MenuForm = styled.form`
  ${menuFormStyledCss};
`;

function AddIframeButton() {
  const { addIframe } = useCommands();
  const [href, setHref] = useState<string>('');
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setHref(e.target.value);
  }, []);

  const handleKeyboard: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
      setIsToggle(!isToggle);
      submitButtonRef.current?.click();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      addIframe({ src: href, height: 250, width: 500 });
      setHref('');
    },
    [addIframe, href],
  );

  const toggleInput: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    // form url 경고메시지 기능을 살리면서 포커싱
    setIsToggle(prevIsToggle => {
      !prevIsToggle ? inputRef.current?.focus() : inputRef.current?.blur();
      return !prevIsToggle;
    });
  };

  return (
    <MenuForm onSubmit={handleSubmit}>
      <MenuInput
        type="url"
        placeholder="Enter URL..."
        ref={inputRef}
        isToggle={isToggle}
        value={href}
        onChange={handleChange}
        onKeyDown={handleKeyboard}
        required
      />
      <MenuButton onClick={toggleInput} titleOption={{ title: 'site embed' }}>
        <MdImageSearch />
      </MenuButton>
      <button type="submit" ref={submitButtonRef} style={{ display: 'none' }} />
    </MenuForm>
  );
}

export default AddIframeButton;
