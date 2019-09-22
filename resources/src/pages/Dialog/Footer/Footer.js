import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types"
import {useThrottle} from 'use-throttle';

import {isMobile} from "../../../utils/isMobile"

import styles from './footer.module.css';

const containerStyle = {transform: `translateY(calc(${isMobile() ? '100vh - 98px' : '100vh - 54px'}))`};

const Footer = ({sendMessage, typing}) => {
  let inputRef = useRef(null);
  const [isSendButtonVisible, setIsSendButtonVisible] = useState(false);
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
    setMessageText(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputRef.current.value.length > 0) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = '';
      setIsSendButtonVisible(false);
      inputRef.current.focus();
    }
  };

  return (
    <form className={styles.container} onSubmit={onSubmit} style={containerStyle}>
      <input
        type='text'
        placeholder='Enter your message'
        ref={inputRef}
        className={styles.messageInput}
        onChange={onInputChange}
      />
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
  );
};

Footer.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  typing: PropTypes.func.isRequired
};

export default Footer;
