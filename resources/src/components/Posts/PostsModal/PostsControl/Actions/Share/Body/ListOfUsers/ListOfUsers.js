import React from "react";
import PropTypes from 'prop-types';

import {isMobile} from "utils/isMobile";

import User from "./User";

import styles from './listOfUsers.module.css'

const ListOfUsers = React.memo(({dialogs, send}) => (
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
));

ListOfUsers.propTypes = {
  dialogs: PropTypes.array,
  send: PropTypes.func.isRequired
};

export default ListOfUsers;
