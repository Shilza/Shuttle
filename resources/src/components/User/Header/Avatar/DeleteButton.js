import {Icon} from "antd";
import React from "react";
import styles from './avatar.module.css';
import {connect} from "react-redux";
import {deleteAvatar} from "../../../../services/user";

const DeleteButton = ({dispatch}) => {
    const deleteAv = () => {
        dispatch(deleteAvatar());
    };

    return (
        <button className={styles.avatarActionButton} onClick={deleteAv}>
            <Icon type='delete'/>
        </button>
    )
};

export default connect()(DeleteButton);