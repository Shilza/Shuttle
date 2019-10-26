import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './optionsModal.module.css';

const OptionsButton = ({open}) => (
  <button className={styles.optionsButton} title={'Actions'} onClick={open}>
    <Icon type="ellipsis"/>
  </button>
);

OptionsButton.propTypes = {
  open: PropTypes.func.isRequired
};

export default OptionsButton;
