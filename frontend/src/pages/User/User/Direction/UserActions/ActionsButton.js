import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './actionsModal.module.css';

const ActionsButton = ({open}) => (
    <button className={styles.actionsButton} onClick={open}>
        <Icon type="ellipsis" style={{marginLeft: 10}}/>
    </button>
);

ActionsButton.propTypes = {
    open: PropTypes.func.isRequired
};

export default React.memo(ActionsButton);