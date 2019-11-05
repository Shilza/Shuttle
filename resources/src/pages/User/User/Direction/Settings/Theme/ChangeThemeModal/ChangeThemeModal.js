import React from "react";
import PropTypes from 'prop-types';
import {SimpleModal} from 'ui';

import moonIcon from './icons/moon.svg';
import sunIcon from './icons/sun.svg';
import styles from './changeThemeModal.module.css';

const ChangeThemeModal = ({visible, mode}) => (
  <SimpleModal visible={visible} zIndex={1001} className={styles.modal} withCloseButton={false}>
    <div className={styles.container}>
      <div className={styles.iconCard}>
        <img className={styles.icon} src={mode === 'dark' ? sunIcon : moonIcon} alt={'Mode icon'}/>
      </div>
      <h1 className={styles.title}>Switching to {mode === 'dark' ? 'light' : 'dark'} theme</h1>
      <span className={styles.text}>Please wait, the interface is being rebuilt, this may take some time</span>
      <div className={styles.loader}/>
    </div>
  </SimpleModal>
);

ChangeThemeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  mode: PropTypes.string
};

export default ChangeThemeModal;
