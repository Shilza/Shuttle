import React, {useEffect, useState} from "react";
import UserRequestCard from "./UserCard/UserRequestCard";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from './transitions.module.css';
import {getSubsRequests} from "../../../services/subscriptionRequests";
import styles from './subReq.module.css';

const SubRequestList = () => {

    let [requests, setRequests] = useState(undefined);

    useEffect(() => {
        getSubsRequests().then(({data}) => setRequests(data));
    }, []);

    const deleteFromSubsList = id => setRequests(requests.filter(item => id !== item.id));

    return (
        <>
            {
                (requests && requests.length > 0) &&
                <div className={styles.subsContainer}>
                    <span className={styles.title}>Subscription requests</span>
                    <ReactCSSTransitionGroup
                        transitionName={transitions}
                        transitionAppear={true}
                        transitionAppearTimeout={300}
                        transitionEnter={false}
                        transitionLeave={true}
                        transitionLeaveTimeout={300}>
                        <div className={styles.cardsContainer}>
                            {requests.map(item =>
                                <UserRequestCard
                                    key={item.id}
                                    user={item}
                                    deleteFromSubsList={deleteFromSubsList}
                                />
                            )}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            }
        </>
    );
};

export default React.memo(SubRequestList);