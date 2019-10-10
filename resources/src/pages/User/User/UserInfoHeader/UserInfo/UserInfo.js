import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {addSmoothScrolling} from "utils/scrolling";
import * as UsersService from "services/user";
import Paginator from "components/Paginator/Paginator";

import Followers from "./Followers";
import Follows from "./Follows";
import PostsCount from "./PostsCount";
import FollowersButton from "./FollowersButton";
import FollowsButton from "./FollowsButton";

import styles from './userInfo.module.css';

const UserInfo = ({postsCount, canSee, followersCount, followsCount, id, dispatch}) => {

  let [isFollowersModal, setIsFollowersModal] = useState(false);
  let [isFollowsModal, setIsFollowsModal] = useState(false);

  useEffect(() => {
    addSmoothScrolling('userInfoPostsLink');
  }, []);

  const closeFollowersModal = () => setIsFollowersModal(false);

  const closeFollowsModal = () => setIsFollowsModal(false);

  const openFollowsModal = () => setIsFollowsModal(true);

  const openFollowersModal = () => setIsFollowersModal(true);

  const loadFollows = page => UsersService.getFollows(id, page)
    .then(({data}) => {
      dispatch.users.addFollows(data.data);
      return data;
    });

  const loadFollowers = page => UsersService.getFollowers(id, page)
    .then(({data}) => {
      dispatch.users.addFollowers(data.data);
      return data;
    });

  return (
    <>
      <ul className={styles.mainContainer}>
        <PostsCount postsCount={postsCount}/>
        <FollowersButton followersCount={followersCount} onClickFollowers={openFollowersModal}/>
        <FollowsButton followsCount={followsCount} onClickFollows={openFollowsModal}/>
      </ul>
      {
        (isFollowsModal && !!followsCount && canSee) &&
        <Paginator
          fetcher={loadFollows}
          useWindow={false}
        >
          <Follows id={id} closeModal={closeFollowsModal}/>
        </Paginator>
      }
      {
        (isFollowersModal && !!followersCount && canSee) &&
        <Paginator
          fetcher={loadFollowers}
          useWindow={false}
        >
          <Followers id={id} closeModal={closeFollowersModal}/>
        </Paginator>
      }
    </>
  );
};

UserInfo.propTypes = {
  postsCount: PropTypes.number.isRequired,
  canSee: PropTypes.bool.isRequired,
  followersCount: PropTypes.number.isRequired,
  followsCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(UserInfo);
