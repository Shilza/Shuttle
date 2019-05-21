import React from "react";
import User from "./User";
import styles from './styles.module.css';

export const UsersList = React.memo(({users}) => (
    <div className={styles.container}>
        {
            users.map(user =>
                <User
                    key={user.id}
                    username={user.username}
                    avatar={user.avatar}
                    bio={user.bio}
                />
            )
        }
    </div>
));