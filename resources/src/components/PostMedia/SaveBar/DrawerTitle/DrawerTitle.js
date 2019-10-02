import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {connect} from "react-redux";
import {setIsSaveModalOpen} from "store/actions/saved";

import styles from './drawerTitle.module.css';

const DrawerTitle = ({dispatch}) => (
  <div className={styles.drawerTitle}>
    <span>Compilations</span>
    <Icon type={'plus'} className={styles.icon} onClick={() => dispatch(setIsSaveModalOpen(true))}/>
  </div>
);

DrawerTitle.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(DrawerTitle);
