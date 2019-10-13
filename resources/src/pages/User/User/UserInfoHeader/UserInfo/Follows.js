import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import ListModal from "components/Modal/ListModal";
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
                onUnfollow={unfollow}
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
  follows: state.users.follows
});

export default connect(mapStateToProps)(Follows);
