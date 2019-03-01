import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
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

DeleteButton.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(DeleteButton);