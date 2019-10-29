import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Username from "./Username";
import Bio from "./Bio";
import Site from "./Site";
import styles from '../edit.module.css';
import {compose} from "redux";

const EditBody = ({user, form}) => (
  <div className={styles.editContainer}>
    <Username initialValue={user.username} form={form}/>
    <Bio initialValue={user.bio} form={form}/>
    <Site initialValue={user.site} form={form}/>
  </div>
);

EditBody.propTypes = {
  user: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({user: state.auth.user})),
)(EditBody);
