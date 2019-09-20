import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withRouter} from "react-router"
import {Icon} from "antd"

import DefaultAvatar from "../../../components/DefaultAvatar/DefaultAvatar"

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
      isTyping && <Typing/>
    }
  </div>
);

const Typing = () => {

  const [countOfDots, setCountOfDots] = useState(3);

  useEffect(() => {
    const id = setTimeout(() => {
      setCountOfDots(countOfDots === 3 ? 1 : countOfDots + 1)
    }, 300);
    return () => clearTimeout(id);
  });

  return (
    <span className={styles.isTyping}>is typing {'.'.repeat(countOfDots)}</span>
  )
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  isTyping: PropTypes.bool.isRequired,
  avatar: PropTypes.string
}

export default withRouter(Header);
