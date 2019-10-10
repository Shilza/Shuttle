import React from "react";
import PropTypes from 'prop-types';

import Paginator from "components/Paginator";
import User from "../User";

import styles from "./usersList.module.css";

const UsersList = ({users, addUser, fetcher}) => (
  <>
    {
      fetcher &&
      <div className={styles.container}>
        <Paginator fetcher={fetcher}>
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
        </Paginator>
        {
          users.length === 0 && <div className={styles.nothingToShow}>Nothing to show</div>
        }
      </div>
    }
  </>
);

UsersList.propTypes = {
  users: PropTypes.array,
  addUser: PropTypes.func.isRequired,
  fetcher: PropTypes.func,
};

export default UsersList;
