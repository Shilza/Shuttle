import React from "react";
import PropTypes from 'prop-types';
import styles from './userPage.module.css';
import StoriesList from "./UserInfoHeader/Stories/StoriesList/StoriesList";
import NavigationPanel from "./NavigationPanel/NavigationPanel";
import {connect} from "react-redux";
import PostsUploader from "../Posts/Uploader";
import UserInfoHeader from "./UserInfoHeader/UserInfoHeader";
import PrivacyExplainingLabel from "../ExplainingLabels/PrivacyLabel/PrivacyExplainingLabel";
import BlacklistedExplainingLabel from "../ExplainingLabels/BlacklistedLabel/BlacklistedExplainingLabel";
import {isMobile} from "../../utils/isMobile";

const User = ({me, canSee, isPrivate, amBlacklisted}) => (
  <div className={styles.userPageContainer}>
    <UserInfoHeader/>
    {
      canSee
        ? <Public me={me}/>
        : ((amBlacklisted && <BlacklistedExplainingLabel/>) || (isPrivate && <PrivacyExplainingLabel/>))
    }
  </div>
);

const Public = ({me}) =>
  <>
    <StoriesList/>
    {
      (me && !isMobile()) && <PostsUploader/>
    }
    <NavigationPanel/>
  </>;

User.propTypes = {
  me: PropTypes.bool.isRequired,
  canSee: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  amBlacklisted: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  me: state.auth.user.id === (state.users.user && state.users.user.id),
  canSee: !!(state.users.user && state.users.user.canSee),
  isPrivate: !!(state.users.user && state.users.user.private),
  amBlacklisted: !!(state.users.user && state.users.user.amBlacklisted)
});

export default connect(mapStateToProps)(User);
