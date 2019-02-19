import React from "react";
import {Icon} from "antd";
import styles from './savebar.module.css';
import {connect} from "react-redux";
import {setIsSaveModalOpen} from "../../../store/actions/saved";

const DrawerTitle = ({dispatch}) => (
    <div className={styles.drawerTitle}>
        <span>Compilations</span>
        <Icon type={'plus'} className={styles.pointer} onClick={() => dispatch(setIsSaveModalOpen(true))}/>
    </div>
);

export default connect()(DrawerTitle);