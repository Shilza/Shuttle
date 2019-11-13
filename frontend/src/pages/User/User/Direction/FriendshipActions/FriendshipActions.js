import React from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {connect} from "react-redux";

const FriendshipButton = ({id, friendshipState, dispatch}) => {

  const friendships = () => (friendshipState !== 0)
    ? dispatch.users.unfollowAsync({id})
    : dispatch.users.followAsync({id});

  let buttonText;
  switch (friendshipState) {
    case 0:
      buttonText = 'Follow';
      break;
    case 1:
      buttonText = 'Subscription request sent';
      break;
    case 2:
      buttonText = 'Unfollow';
      break;
    default:
      buttonText = 'Undefined';
  }

  return (
    <Button size={'small'} onClick={friendships}>
      {buttonText}
    </Button>
  );
};

FriendshipButton.propTypes = {
  id: PropTypes.number.isRequired,
  friendshipState: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  id: state.users.user.id,
  friendshipState: state.users.user.friendshipState
});

export default connect(mapStateToProps)(FriendshipButton);
