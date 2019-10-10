import React from "react";
import styles from './notifications.module.css';
import SubscriptionRequests from "./SubscriptionRequests/SubscriptionRequests";
import NotificationsList from "./Notifications/NotificationsList";

const Notifications = () => (
    <div className={styles.notificationsContainer}>
      <SubscriptionRequests/>
      <NotificationsList/>
    </div>
);

export default Notifications;
