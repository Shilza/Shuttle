import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {message} from 'antd';

import {ListModal} from 'ui';
import {searchFollowers} from "services/user";
import UserFriendshipCard from "./UserFriendshipCard";

import styles from './friendships.module.css';


const Followers = ({closeModal, me, id, followers, dispatch}) => {

  const search = event => {
    let username = event.target.value;
    if (username.length <= 12)
      searchFollowers(id, username)
        .then(({data}) => {
          dispatch.users.setFollowers(data.data);
          return data;
        });
  };

  const onRemove = useCallback((id) => {
    dispatch.users.removeFollowerAsync(id)
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }, []);

  return (
    <ListModal onClose={closeModal} title={'Followers'} visible>
      <div className={styles.friendshipsContainer}>
        <input className={styles.search} maxLength={12} onChange={search} placeholder={'Username'}/>
        <ul>
          {
            followers.map(user =>
              <UserFriendshipCard
                key={user.id}
                avatar={user.avatar}
                username={user.username}
                closeModal={closeModal}
                onRemove={me && onRemove}
                id={user.id}
              />
            )
          }
        </ul>
      </div>
    </ListModal>
  );
};

Followers.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  followers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  })),
  me: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  followers: state.users.followers,
  me: state.auth.user.id === (state.users.user && state.users.user.id)
});

export default connect(mapStateToProps)(Followers);
