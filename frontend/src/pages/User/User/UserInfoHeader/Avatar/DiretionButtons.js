import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {UploadButton} from "./UploadButton";
import DeleteButton from "./DeleteButton";
import styles from './avatar.module.css';

const DirectionButtons = ({avatar, me}) => (
  <>
    {
      me &&
      <div className={styles.buttonsContainer}>
        <UploadButton/>
        {
          avatar && <DeleteButton/>
        }
      </div>
    }
  </>
);

DirectionButtons.propTypes = {
  avatar: PropTypes.string,
  me: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  me: state.users.user.id === state.auth.user.id
});

export default connect(mapStateToProps)(DirectionButtons);
