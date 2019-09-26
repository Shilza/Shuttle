import React from "react";
import PropTypes from 'prop-types';

import styles from "./header.module.css";

const Header = ({src, onInputChange}) => (
  <div className={styles.container}>
    <img className={styles.image} src={src} alt='Post'/>
    <input
      className={styles.input}
      onChange={onInputChange}
      placeholder='Write message...'
    />
  </div>
);

Header.ptopTypes = {
  src: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Header;
