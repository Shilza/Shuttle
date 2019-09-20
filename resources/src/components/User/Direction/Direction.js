import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import styles from './direction.module.css';
import DirectionActions from "./DirectionActions";
import FriendshipActions from "./FriendshipActions"
import {connect} from "react-redux"
import {Button} from "antd"
import {compose} from "redux"
import {withRouter} from "react-router"

const Direction = ({username, me, amBlacklisted, history}) => {

  const goToMessages = useCallback(() => {
    history.push(`/u/messages/${username}`);
  }, []);

  return (
    <>
      <div className={styles.directionContainer}>
    <span className={styles.username}>
      {username}
    </span>
        <DirectionActions me={me}/>
      </div>
      <div className={styles.friendshipMessageContainer}>
        {
          !amBlacklisted && !me &&
          <>
            <FriendshipActions/>
            <Button size='small' onClick={goToMessages}>Send message</Button>
          </>
        }
      </div>
    </>
  );
};


Direction.propTypes = {
  username: PropTypes.string.isRequired,
  me: PropTypes.bool.isRequired,
  amBlacklisted: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  me: state.auth.user.id === state.users.user.id,
  amBlacklisted: state.users.user.amBlacklisted
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(Direction);
