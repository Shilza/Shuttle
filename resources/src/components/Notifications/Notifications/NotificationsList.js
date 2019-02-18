import React, {useState} from "react";
import {getNotifications} from "../../../services/notifications";
import Notification from "./Notification";
import styles from './notifications.module.css';
import {connect} from "react-redux";
import Paginator from "../../Paginator";
import BlanksList from "./BlanksList";


const NotificationsList = ({notificationsCount, dispatch, notifications, page}) => {

    const fetchNotifications = page => dispatch(getNotifications(page));

    return (
        <>
            {
                !!notificationsCount &&
                <div className={styles.notificationsList}>
                    {
                        notifications && !notifications.length && <BlanksList count={notificationsCount}/>
                    }
                    <Paginator
                        fetcher={fetchNotifications}
                        initialPage={page}
                    >
                        {
                            notifications && notifications.map((item, index) => <Notification key={index} item={item}/>)
                        }
                    </Paginator>
                </div>
            }
        </>
    );
};


const mapStateToProps = state => ({
    notificationsCount: state.auth.user.notificationsCount,
    notifications: state.notifications.notifications.data,
    page: state.notifications.notifications.page
});

export default connect(mapStateToProps)(NotificationsList);