import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withRouter} from "react-router"
import {Icon} from "antd"

import DefaultAvatar from "components/DefaultAvatar"
import Typing from "components/Typing";

import styles from './header.module.css';

const Header = ({username, avatar, isTyping, history}) => (
  <div className={styles.container}>
    <Icon type={'arrow-left'} className={styles.arrowLeft} onClick={history.goBack}/>
    <Link to={`/${username}`} className={styles.avatar}>
      {
        avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'20px'}/>
      }
    </Link>
    <Link to={`/${username}`} className={styles.username}>
      {
        username
      }
    </Link>
    {
      isTyping && <Typing className={styles.isTyping}/>
    }
  </div>
);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  isTyping: PropTypes.bool.isRequired,
  avatar: PropTypes.string
};

export default withRouter(Header);
