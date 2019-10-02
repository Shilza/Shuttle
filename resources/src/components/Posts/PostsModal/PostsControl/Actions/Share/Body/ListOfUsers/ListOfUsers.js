import React from "react";
import PropTypes from 'prop-types';

import {isMobile} from "utils/isMobile";
import Paginator from "components/Paginator/";

import User from "./User";

import styles from './listOfUsers.module.css'

const ListOfUsers = React.memo(({dialogs, fetchDialogs, send}) => (
  <Paginator fetcher={fetchDialogs}>
    <ul className={isMobile() ? styles.mobileContainer : styles.container}>
      {
        dialogs.map(({id, user}) =>
          <User
            key={id}
            avatar={user.avatar}
            username={user.username}
            id={user.id}
            send={send}
          />
        )
      }
    </ul>
  </Paginator>
));

ListOfUsers.propTypes = {
  dialogs: PropTypes.array,
  send: PropTypes.func.isRequired,
  fetchDialogs: PropTypes.func.isRequired
};

export default ListOfUsers;
