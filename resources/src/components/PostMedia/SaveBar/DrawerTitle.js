import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './savebar.module.css';
import {connect} from "react-redux";
import {setIsSaveModalOpen} from "../../../store/actions/saved";

const DrawerTitle = ({dispatch}) =>
    <div className={styles.drawerTitle}>
        <span>Compilations</span>
        <Icon type={'plus'} className={styles.icon} onClick={() => dispatch(setIsSaveModalOpen(true))}/>
    </div>;

DrawerTitle.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(DrawerTitle);