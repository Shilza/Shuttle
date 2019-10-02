import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import ButtonsContainer from "./ButtonsContainer";
import DefaultAvatar from "components/DefaultAvatar";

import styles from './userCard.module.css';

const UserRequestCard = ({user, deleteFromSubsList}) => {

  const {username, avatar} = user;

  return (
    <div className={styles.userCardContainer}>
      <Link className={styles.avatar} to={`/${username}`}>
        {
          avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'30px'}/>
        }
      </Link>
      <div className={styles.subContainer}>
        <Link to={`/${username}`} className={styles.usernameLink}>
          {username}
        </Link>
        <ButtonsContainer id={user.id} deleteFromSubsList={deleteFromSubsList}/>
      </div>
    </div>
  );
};

UserRequestCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  deleteFromSubsList: PropTypes.func.isRequired
};

export default React.memo(UserRequestCard);
