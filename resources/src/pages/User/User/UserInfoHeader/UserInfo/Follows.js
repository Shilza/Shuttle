import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {ListModal} from 'ui';
import UserFriendshipCard from "./UserFriendshipCard";
import {searchFollows} from "services/user";

import styles from './friendships.module.css';

const Follows = ({closeModal, me, id, dispatch, follows}) => {

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
    <ListModal onClose={closeModal} title={'Follows'} visible>
      <div className={styles.friendshipsContainer}>
        <input className={styles.search} maxLength={12} onChange={search} placeholder={'Username'}/>
        <ul>
          {
            follows.map(user =>
              <UserFriendshipCard
                key={user.id}
                id={user.id}
                avatar={user.avatar}
                username={user.username}
                closeModal={closeModal}
                onUnfollow={me && unfollow}
              />
            )
          }
        </ul>
      </div>
    </ListModal>
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
  follows: state.users.follows,
  me: state.auth.user.id === (state.users.user && state.users.user.id)
});

export default connect(mapStateToProps)(Follows);
