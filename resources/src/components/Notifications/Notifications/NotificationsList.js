import React from "react";
import {getNotifications} from "../../../services/notifications";
import Notification from "./Notification";
import styles from  './notifications.module.css';

class NotificationsList extends React.PureComponent {

    state = {
        notifications: undefined
    };

    componentDidMount() {
        getNotifications().then(({data}) => this.setState({notifications: data}));
    }

    render() {
        const {notifications} = this.state;
        return (
            <div className={styles.notificationsList}>
                {
                    notifications && notifications.map((item, index) => <Notification key={index} item={item}/>)
                }
            </div>
        );
    }
}

export default NotificationsList;