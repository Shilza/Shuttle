import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import styles from './header.module.css';

const backButtonStyle = {color: 'var(--icon)'};

const Header = ({goNext, goBack, title, nextButtonText, withEnter = true}) => {
  useEffect(() => {
    if (withEnter && goNext && typeof goNext === 'function') {
      const listener = (e) => {
        if (e.key === 'Enter')
          goNext();
      };
      document.body.addEventListener('keydown', listener);
      return () => {
        document.body.removeEventListener('keydown', listener);
      }
    }
  }, [withEnter, goNext]);

  return (
    <div className={styles.container}>
      {
        goBack && <Icon type={'arrow-left'} style={backButtonStyle} onClick={goBack} className={styles.back} title={'Back'}/>
      }
      <span className={styles.title}>{title}</span>
      {
        goNext &&
        <button onClick={goNext} className={styles.next} type={'submit'}>
          {nextButtonText}
        </button>
      }
    </div>
  );
};

Header.propTypes = {
  goNext: PropTypes.func,
  goBack: PropTypes.func,
  title: PropTypes.string,
  nextButtonText: PropTypes.string,
  withEnter: PropTypes.bool
};

export default Header;
