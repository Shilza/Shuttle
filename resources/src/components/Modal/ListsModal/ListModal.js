import React from "react";
import PropTypes from 'prop-types';
import styles from './listModal.module.css'

const ListModal = ({children}) => (
  <ul className={styles.listModalContainer}>
    {children}
  </ul>
);

ListModal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])).isRequired
};

export default ListModal;
