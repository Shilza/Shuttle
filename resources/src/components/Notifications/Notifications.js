import React from "react";
import {Tabs} from 'antd';
import styles from './notifications.module.css';
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SubscriptionRequestsLabel from "./SubscriptionRequests/SubscriptionRequestsLabel";
import NotificationsList from "./Notifications/NotificationsList";

const TabPane = Tabs.TabPane;

const Notifications = () => (
    <ReactCSSTransitionGroup
        transitionName={transitions}
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeaveTimeout={300}
        style={{width: '100%', display: 'flex', justifyContent: 'center'}}
    >
        <Tabs defaultActiveKey="1" className={styles.notificationsContainer}>
            <TabPane tab="Follows" key="1">
                <div>Follows</div>
            </TabPane>
            <TabPane tab="You" key="2">
                <SubscriptionRequestsLabel count={2}/>
                <NotificationsList/>
            </TabPane>
        </Tabs>
    </ReactCSSTransitionGroup>
);

export default Notifications;