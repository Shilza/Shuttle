import React from "react";
import UserCard from "./Card/UserCard";
import {connect} from "react-redux";
import {removeFromBlacklist} from "../../services/user";
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Blacklisted = ({user, dispatch}) => {
    const removeUser = () => dispatch(removeFromBlacklist(user.id));

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
            transitionEnterTimeout={400}
            transitionLeave={true}
            transitionLeaveTimeout={400}>
            <UserCard avatar={user.avatar} username={user.username} removeUser={removeUser}/>
        </ReactCSSTransitionGroup>
    );
};

export default connect()(Blacklisted);