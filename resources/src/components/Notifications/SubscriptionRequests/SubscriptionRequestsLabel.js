import DefaultAvatar from "../../DefaultAvatar/DefaultAvatar";
import {Badge} from 'antd';
import React from "react";
import styles from './subReq.module.css';

const SubscriptionRequestsLabel = ({count, openList, avatar}) => (
    <>
        {
            count && <div className={styles.subReqLabel} onClick={openList}>
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

export default SubscriptionRequestsLabel;