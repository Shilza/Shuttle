import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {connect} from "react-redux";

import styles from './drawerTitle.module.css';

const DrawerTitle = ({dispatch}) => {

  const openModal = () => dispatch.saved.setIsModalOpen(true);

  return (
    <div className={styles.drawerTitle}>
      <h1 className={styles.title}>Compilations</h1>
      <Icon type={'plus'} className={styles.icon} style={{color: 'var(--icon)'}} onClick={openModal}/>
    </div>
  );
};

DrawerTitle.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(DrawerTitle);
