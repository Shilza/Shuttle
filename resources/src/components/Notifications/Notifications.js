import React from "react";
import {Tabs} from 'antd';
import styles from './notifications.module.css';
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const TabPane = Tabs.TabPane;

const Notifications = () => (
    <ReactCSSTransitionGroup
        transitionName={transitions}
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnter={false}
        transitionLeaveTimeout={300}>
        <Tabs defaultActiveKey="1" className={styles.notificationsContainer}>
            <TabPane tab="Follows" key="1">
                <div>Follows</div>
            </TabPane>
            <TabPane tab="You" key="2">
                <div>You</div>
            </TabPane>
        </Tabs>
    </ReactCSSTransitionGroup>
);

export default Notifications;