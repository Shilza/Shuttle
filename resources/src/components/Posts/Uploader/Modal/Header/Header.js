import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import styles from './header.module.css';

const Header = ({goNext, goBack, title, nextButtonText}) => (
  <div className={styles.container}>
    {
      goBack &&  <Icon type={'arrow-left'} onClick={goBack} className={styles.back}/>
    }
    <span className={styles.title}>{title}</span>
    {
      goNext &&
      <button onClick={goNext} className={styles.next}>
        {nextButtonText}
      </button>
    }
  </div>
);

Header.propTypes = {
  goNext: PropTypes.func,
  goBack: PropTypes.func,
  title: PropTypes.string,
  nextButtonText: PropTypes.string
};

export default Header;
