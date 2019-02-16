import React from "react";
import {getNotifications} from "../../../services/notifications";
import Notification from "./Notification";
import styles from './notifications.module.css';
import {connect} from "react-redux";
import transitions from './transitions.module.css';
import NotificationBlank from "./NotificationBlank";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BlanksList from "./BlanksList";

class NotificationsList extends React.PureComponent {

    state = {
        notifications: undefined
    };

    componentDidMount() {
        getNotifications().then(({data}) => this.setState({notifications: data}));
    }

    getNotificationsBlanks = () => {
        const {notificationsCount} = this.props;
        const notificationsBlanks = [];

        for (let i = 0; i < notificationsCount; i++)
            notificationsBlanks.push(<NotificationBlank key={i}/>);

        return notificationsBlanks;
    };

    render() {
        const {notifications} = this.state;
        const {notificationsCount} = this.props;

        return (
            <>
                {
                    !!notificationsCount &&
                    <div className={styles.notificationsList}>
                        <ReactCSSTransitionGroup
                            transitionName={transitions}
                            transitionAppear={false}
                            transitionEnter={false}
                            transitionLeaveTimeout={500}>
                            {
                                !!(!notifications && notificationsCount) && <BlanksList count={notificationsCount}/>
                            }
                        </ReactCSSTransitionGroup>
                        {
                            notifications && notifications.map((item, index) => <Notification key={index} item={item}/>)
                        }
                    </div>
                }
            </>
        );
    }
}


const mapStateToProps = state => ({
    notificationsCount: state.auth.user.notificationsCount
});

export default connect(mapStateToProps)(NotificationsList);