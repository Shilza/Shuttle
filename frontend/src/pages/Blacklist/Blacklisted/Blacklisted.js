import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import UserCard from "../Card/UserCard";
import transitions from '../transitions.module.css';

const Blacklisted = ({id, avatar, username, dispatch}) => {
  const removeUser = () => dispatch.blacklist.removeFromBlacklistAsync(id);

  return (
    <ReactCSSTransitionGroup
      transitionName={{
        enter: transitions.enter,
        enterActive: transitions.enterActive,
        leave: transitions.leave,
        leaveActive: transitions.leaveActive,
        appear: transitions.appear,
        appearActive: transitions.appearActive
      }}
      transitionAppear={true}
      transitionAppearTimeout={400}
      transitionEnter={true}
      transitionEnterTimeout={400}
      transitionLeave={true}
      transitionLeaveTimeout={400}
    >
      <UserCard avatar={avatar} username={username} removeUser={removeUser}/>
    </ReactCSSTransitionGroup>
  );
};

Blacklisted.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Blacklisted);
