import React from "react";
import PropTypes from 'prop-types';
import NotificationBlank from "./NotificationBlank";
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const BlanksList = ({count}) => {
    const getNotificationsBlanks = () => {
        const notificationsBlanks = [];

        for (let i = 0; i < count; i++)
            notificationsBlanks.push(<NotificationBlank key={i}/>);

        return notificationsBlanks;
    };

    return (
        <ReactCSSTransitionGroup
            transitionName={transitions}
            transitionAppear={false}
            transitionEnter={false}
            transitionLeaveTimeout={500}>
            {
                getNotificationsBlanks()
            }
        </ReactCSSTransitionGroup>
    );
};

BlanksList.propTypes = {
    count: PropTypes.number.isRequired
};

export default React.memo(BlanksList);