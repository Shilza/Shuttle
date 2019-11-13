import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {connect} from "react-redux";
import styles from './avatar.module.css';

const DeleteButton = ({dispatch}) => {
  const deleteAv = () => {
    dispatch.users.deleteAvatarAsync();
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
