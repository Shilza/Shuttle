import React from "react";
import PropTypes from 'prop-types';

import {isMobile} from "utils/isMobile";
import Paginator from "components/Paginator/";

import User from "./User";

import styles from './listOfUsers.module.css'

const ListOfUsers = React.memo(({users, fetcher, send}) => {
  const ul = () => (
    <ul className={isMobile() ? styles.mobileContainer : styles.container}>
      {
        users.map((user) =>
          <User
            key={user.id}
            avatar={user.avatar}
            username={user.username}
            id={user.id}
            send={send}
          />
        )
      }
    </ul>
  );

  return (
    <>
      {
        fetcher
          ? <Paginator fetcher={fetcher}>{ul()}</Paginator>
          : <>{ul()}</>
      }
    </>
  )
});

ListOfUsers.propTypes = {
  users: PropTypes.array,
  send: PropTypes.func.isRequired,
  fetcher: PropTypes.func,
};

export default ListOfUsers;
