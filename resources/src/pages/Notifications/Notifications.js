import React from "react";
import styles from './notifications.module.css';
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SubscriptionRequests from "./SubscriptionRequests/SubscriptionRequests";
import NotificationsList from "./Notifications/NotificationsList";

const Notifications = () => (
    <ReactCSSTransitionGroup
        transitionName={transitions}
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeaveTimeout={300}
        className={styles.transitionContainer}
    >
        <div className={styles.notificationsContainer}>
            <SubscriptionRequests/>
            <NotificationsList/>
        </div>
    </ReactCSSTransitionGroup>
);

export default Notifications;