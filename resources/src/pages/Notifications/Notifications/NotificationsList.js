import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Paginator from "components/Paginator/Paginator";
import NotificationsExplainingLabel from "components/ExplainingLabels/NotificationsLabel/NotificationsExplainingLabel";
import BlanksList from "./BlanksList";
import Notification from "./Notification";
import styles from './notifications.module.css';


const NotificationsList = ({notificationsCount, dispatch, notifications}) => {

  const [firstLoading, setFirstLoading] = useState(false);

  const fetchNotifications = useCallback((page) =>
    dispatch.notifications.get(page).then(data => {
      if (!firstLoading)
        setFirstLoading(true);
      return data;
    }), []);

  return (
    <>
      <div className={notifications.length > 0 ? styles.notificationsList : ''}>
        {
          notifications.length > 0 && <span className={styles.title}>Notifications</span>
        }
        {
          <BlanksList count={notificationsCount}/>
        }
        <Paginator fetcher={fetchNotifications}>
          {
            !!notifications && notifications.map((item, index) =>
              <Notification key={index} item={item}/>
            )
          }
        </Paginator>
      </div>
      {firstLoading && notifications.length === 0 && <NotificationsExplainingLabel/>}
    </>
  );
};

NotificationsList.propTypes = {
  notificationsCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array,
};

const mapStateToProps = state => ({
  notificationsCount: state.auth.user.notificationsCount,
  notifications: state.notifications
});

export default connect(mapStateToProps)(NotificationsList);
