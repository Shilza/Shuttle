import React from "react";
import styles from './avatar.module.css';

const Avatar = ({avatar}) => {
    return (
        <div className={styles.avatarContainer}>

            <img className={styles.avatar}
                 alt='Avatar'
                 src={'https://st2.depositphotos.com/3004689/8004/v/950/depositphotos_80045394-stock-illustration-hipster-man-face.jpg'}
            />

            {/*: <Icon type="user" style={{color: 'rgba(0,0,0,.25)', fontSize: 96}}/>*/}
            <div className={styles.buttonsContainer}/>
        </div>
    );
};


export default Avatar;