import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import styles from './defaultAvatar.module.css';

const DefaultAvatar = ({fontSize = '50px', color = '#3ea1fd', className, ...props}) => (
  <div className={`${styles.avatar} ${className}`} {...props}>
    <Icon type='user' style={{fontSize, color}}/>
  </div>
);

DefaultAvatar.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

export default DefaultAvatar
