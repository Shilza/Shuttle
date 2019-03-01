import React from "react";
import PropTypes from 'prop-types';
import {Badge} from 'antd';
import styles from './subReq.module.css';
import DefaultAvatar from "../../../components/DefaultAvatar/DefaultAvatar";

const SubscriptionRequestsLabel = ({count, openList, avatar}) => (
    <>
        {
            !!count &&
            <div className={styles.subReqLabel} onClick={openList}>
                <Badge count={count} className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        {
                            avatar ? <img src={avatar} alt={'avatar'}/> :
                                <DefaultAvatar fontSize={'30px'}/>
                        }
                    </div>
                </Badge>
                <div className={styles.infoContainer}>
                    <span className={styles.subReqTitle}>Subscriptions</span>
                    <span>Accept or deny</span>
                </div>
            </div>
        }
    </>
);

SubscriptionRequestsLabel.propTypes = {
    count: PropTypes.number,
    openList: PropTypes.func.isRequired,
    avatar: PropTypes.string
};

export default React.memo(SubscriptionRequestsLabel);