import React from "react";
import PropTypes from 'prop-types';
import styles from './optionsModal.module.css'

const OptionsModal = ({children}) => (
  <ul className={styles.container}>
    {children}
  </ul>
);

OptionsModal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])).isRequired
};

export default OptionsModal;
