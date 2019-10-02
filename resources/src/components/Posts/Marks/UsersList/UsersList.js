import React from "react";
import PropTypes from 'prop-types';

import User from "../User";

import styles from "./usersList.module.css";

const UsersList = ({users, addUser}) => (
  <>
    {
      users.length > 0 &&
      <div className={styles.container}>
        <div className={styles.list}>
          {
            users.map(user =>
              <User
                user={user}
                key={user.id}
                onClick={(event) => {
                  event.preventDefault();
                  addUser(user);
                }}
              />
            )
          }
        </div>
      </div>
    }
  </>
);

UsersList.propTypes = {
  users: PropTypes.array,
  addUser: PropTypes.func.isRequired
};

export default UsersList;
