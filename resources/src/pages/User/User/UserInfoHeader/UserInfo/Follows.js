import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Modal from "components/Modal/Modal";
import UserFriendshipCard from "./UserFriendshipCard";
import {searchFollows} from "services/user";

import styles from './friendships.module.css';

const Follows = ({closeModal, id, dispatch, follows}) => {

  const search = event => {
    let username = event.target.value;
    if (username.length <= 12)
      searchFollows(id, username)
        .then(({data}) => {
          dispatch.users.setFollows(data.data);
          return data;
        });
  };

  const unfollow = (id) => {
    dispatch.users.unfollowAsync({id});
  };

  return (
    <Modal onClose={closeModal} visible>
      <div className={styles.friendshipsContainer}>
        <input maxLength={12} onChange={search}/>
        <ul>
          {
            follows.map(user =>
              <UserFriendshipCard
                key={user.id}
                id={user.id}
                avatar={user.avatar}
                username={user.username}
                closeModal={closeModal}
                onUnfollow={unfollow}
              />
            )
          }
        </ul>
      </div>
    </Modal>
  );
};

Follows.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  follows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }))
};

const mapStateToProps = state => ({
  follows: state.users.follows
});

export default connect(mapStateToProps)(Follows);
