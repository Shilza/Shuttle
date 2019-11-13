import React, {useState} from "react";
import PropTypes from 'prop-types';

import CLinkify from "components/CLinkify";

import styles from './caption.module.css';

const Caption = ({caption, username, className}) => {

  const [showCaption, setShowCaption] = useState(false);

  const shopCaption = () => {
    setShowCaption(!showCaption);
  };

  return (
    <>
      {
        caption &&
        <div className={`${styles.captionContainer} ${className}`} style={{display: showCaption ? 'block' : 'flex'}}
             onClick={shopCaption}>
          <span className={styles.username}>{username}</span>
          <CLinkify className={showCaption ? styles.fullCaption : styles.shortCaption}>{caption}</CLinkify>
        </div>
      }
    </>
  )
};

Caption.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Caption;
