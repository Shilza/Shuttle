import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {connect} from "react-redux";

import styles from './drawerTitle.module.css';

const iconStyle = {color: 'var(--icon)'};

const DrawerTitle = ({dispatch}) => {

  const openModal = () => dispatch.saved.setIsModalOpen(true);

  return (
    <div className={styles.drawerTitle}>
      <h1 className={styles.title}>Compilations</h1>
      <Icon type={'plus'} className={styles.icon} style={iconStyle} onClick={openModal} title={'Create compilation'}/>
    </div>
  );
};

DrawerTitle.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(DrawerTitle);
