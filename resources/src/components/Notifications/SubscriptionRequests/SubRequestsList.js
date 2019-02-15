import React from "react";
import UserRequestCard from "./UserRequestCard";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from './transitions.module.css';

const SubRequestList = ({requests = [{username: 'Shilza'}]}) => {

    return (
        <ReactCSSTransitionGroup
            transitionName={transitions}
            transitionAppear={true}
            transitionAppearTimeout={250}
            transitionEnter={false}
            transitionLeaveTimeout={300}>
            {requests.map(item => <UserRequestCard key={item} item={item}/>)}
        </ReactCSSTransitionGroup>
    );
};

export default SubRequestList;