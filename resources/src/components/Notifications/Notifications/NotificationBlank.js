import React from "react";
import styles from './notifications.module.css';
import stylesBlank from './notificationBlank.module.css';

const NotificationBlank = () => {
    return (
        <div className={styles.notificationCard}>
            <div className={stylesBlank.avatarStub}/>
            <div className={styles.infoWrapper}>
                <div className={stylesBlank.infoContainer}>
                    <span className={stylesBlank.usernameStub} style={{width: random(40, 80)}}/>
                    <span className={stylesBlank.infoStub}  style={{width: random(30, 140)}}/>
                    <span className={stylesBlank.infoStub}  style={{width: random(30, 140)}}/>
                </div>
                <span className={stylesBlank.timeStub}/>
            </div>
            <div className={stylesBlank.postImgStub}/>
        </div>
    );
};

const random = (min, max) =>  {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

export default React.memo(NotificationBlank);