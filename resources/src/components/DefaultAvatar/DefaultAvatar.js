import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './avatar.module.css';

const DefaultAvatar = ({fontSize = '50px', color='#3ea1fd'}) =>
    <div className={styles.avatar}>
        <Icon type='user' style={{fontSize, color}}/>
    </div>;

DefaultAvatar.propTypes = {
    fontSize: PropTypes.string,
    color: PropTypes.string
};

export default DefaultAvatar