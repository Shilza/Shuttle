import React from "react";
import PropTypes from 'prop-types';
import Username from "./Username";
import {connect} from "react-redux";
import Bio from "./Bio";
import Site from "./Site";
import styles from '../edit.module.css';

const EditBody = ({user}) => (
    <div className={styles.editContainer}>
        <Username username={user.username}/>
        <Bio bio={user.bio}/>
        <Site site={user.site}/>
    </div>
);

EditBody.propTypes = {
    user: PropTypes.object.isRequired,
};

export default connect(state => ({user: state.auth.user}))(EditBody);
