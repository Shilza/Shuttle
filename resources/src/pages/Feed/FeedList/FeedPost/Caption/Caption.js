import React, {useState} from "react";
import PropTypes from 'prop-types';

import styles from './caption.module.css';

const Caption = ({caption, username}) => {

  const [showCaption, setShowCaption] = useState(false);

  const shopCaption = () => {
    setShowCaption(!showCaption);
  };

  return (
    <>
      {
        caption &&
        <div className={styles.captionContainer} style={{display: showCaption ? 'block' : 'flex'}}
             onClick={shopCaption}>
          <span className={styles.username}>{username}</span>
          <span className={showCaption ? styles.fullCaption : styles.shortCaption}>{caption}</span>
        </div>
      }
    </>
  )
};

Caption.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default Caption;
