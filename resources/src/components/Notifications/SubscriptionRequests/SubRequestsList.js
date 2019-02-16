import React from "react";
import UserRequestCard from "./UserRequestCard";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from './transitions.module.css';
import {getSubsRequests} from "../../../services/subscriptionRequests";
import styles from './subReq.module.css';

class SubRequestList extends React.PureComponent {

    state = {
        requests: undefined
    };

    componentDidMount() {
        getSubsRequests().then(({data}) => this.setState({requests: data}))
    }

    deleteFromSubsList = id => {
        const requests = this.state.requests.filter(item => id !== item.id);

        this.setState({requests});
    };

    render() {
        const {requests} = this.state;

        return (
            <>
                {
                    (requests && requests.length > 0) &&
                    <div className={styles.notificationsList}>
                        <ReactCSSTransitionGroup
                            transitionName={transitions}
                            transitionAppear={true}
                            transitionAppearTimeout={1000}
                            transitionEnter={false}
                            transitionLeaveTimeout={300}>
                            {requests.map(item =>
                                <UserRequestCard
                                    key={item.id}
                                    user={item}
                                    deleteFromSubsList={this.deleteFromSubsList}
                                />
                            )}
                        </ReactCSSTransitionGroup>
                    </div>
                }
            </>
        );
    }
}

export default SubRequestList;