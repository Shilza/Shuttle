import React, {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types"
import {useThrottle} from 'use-throttle';

import EmojiPicker from "./EmojiPicker";

import emojiIcon from './icons/smile.svg';
import styles from './footer.module.css';


const Footer = ({sendMessage, typing}) => {
  let inputRef = useRef(null);
  const [isSendButtonVisible, setIsSendButtonVisible] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const throttledMessageText = useThrottle(messageText, 1200);

  useEffect(() => {
    if (throttledMessageText.length > 0)
      typing();
  }, [throttledMessageText]);

  const onInputChange = (event) => {
    const value = event.target.value;
    if (!isSendButtonVisible && value.length > 0)
      setIsSendButtonVisible(true);
    else if (event.target.value.length === 0)
      setIsSendButtonVisible(false);
    if (value.length < 1000)
      setMessageText(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (messageText.length > 0 && messageText.length <= 1000) {
      sendMessage(messageText);
      setMessageText('');
      setIsSendButtonVisible(false);
      setIsEmojiOpen(false);
      inputRef.current.focus();
    }
  };

  const toggleEmoji = () => {
    setIsEmojiOpen(!isEmojiOpen);
  };

  const addEmoji = useCallback((emoji) => {
    if (messageText.length < 1000) {
      setMessageText(messageText + emoji.native);
      inputRef.current.focus();
      if (!isSendButtonVisible)
        setIsSendButtonVisible(true);
    }
  }, [messageText]);

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <input
            type='text'
            placeholder='Enter your message'
            ref={inputRef}
            className={styles.messageInput}
            maxLength={1000}
            value={messageText}
            onChange={onInputChange}
          />
          {
            <button type={'button'} className={styles.emojiIcon} onClick={toggleEmoji}>
              <img src={emojiIcon} alt={'Emoji'}/>
            </button>
          }
        </div>
        {
          isSendButtonVisible &&
          <button
            className={styles.sendButton}
            type='submit'
          >
            Send
          </button>
        }
      </form>
      {isEmojiOpen && <EmojiPicker addEmoji={addEmoji}/>}
    </>
  );
};

Footer.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  typing: PropTypes.func.isRequired
};

export default Footer;
