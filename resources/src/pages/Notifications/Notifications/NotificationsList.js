import React from "react";
import PropTypes from 'prop-types';
import {getNotifications} from "../../../services/notifications";
import Notification from "./Notification";
import styles from './notifications.module.css';
import {connect} from "react-redux";
import BlanksList from "./BlanksList";
import Paginator from "../../../components/Paginator/Paginator";
import NotificationsExplainingLabel
  from "../../../components/ExplainingLabels/NotificationsLabel/NotificationsExplainingLabel";


const NotificationsList = ({notificationsCount, dispatch, notifications, page}) => {

  const fetchNotifications = page => dispatch(getNotifications(page));

  return (
    <>
      {
        notificationsCount !== 0 ?
          <div className={styles.notificationsList}>
            <span className={styles.title}>Notifications</span>
            {
              !notifications && <BlanksList count={notificationsCount}/>
            }
            <Paginator
              fetcher={fetchNotifications}
              initialPage={page}
            >
              {
                !!notifications && notifications.map((item, index) =>
                  <Notification key={index}
                                item={item}
                  />
                )
              }
            </Paginator>
          </div>
          : <NotificationsExplainingLabel/>
      }
    </>
  );
};

NotificationsList.propTypes = {
  notificationsCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  page: PropTypes.number
};

const mapStateToProps = state => ({
  notificationsCount: state.auth.user.notificationsCount,
  notifications: state.notifications.notifications.data,
  page: state.notifications.notifications.page
});

export default connect(mapStateToProps)(NotificationsList);
