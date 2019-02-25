import React from "react";
import styles from './avatar.module.css';
import DirectionButtons from './DiretionButtons';
import DefaultAvatar from "../../../DefaultAvatar/DefaultAvatar";

const Avatar = ({avatar}) =>
    <div className={styles.avatarContainer}>
        {
            avatar ?
                <img className={styles.avatar}
                     alt='Avatar'
                     src={avatar}
                />
                :
                <div className={styles.avatar}>
                    <DefaultAvatar avatar={avatar} color={'darkgray'}/>
                </div>
        }
        <DirectionButtons avatar={avatar}/>
    </div>;

export default React.memo(Avatar);