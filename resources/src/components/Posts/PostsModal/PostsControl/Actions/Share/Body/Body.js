import React, {useCallback, useEffect, useMemo, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import SearchInput from "components/SearchInput/SearchInput";

import {isMobile} from "utils/isMobile";
import useDialogs from "utils/useDialogs"
import ws, {types as WsTypes} from "../../../../../../../Ws";

import Header from "./Header";
import ListOfUsers from "./ListOfUsers";

import styles from './body.module.css';

const prepare = (users) => users.map(user => user.user ? user.user : user);

const Body = ({src, myId, close, dispatch}) => {

  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [fetcher, setFetcher] = useState(null);
  const {dialogs, privateSearch, fetchDialogs} = useDialogs();

  useEffect(() => {
    fetchDialogs();
  }, []);

  const postCode = useMemo(() => src.split('/')[3].split('.')[0], [src]);

  const send = (id) => {
    const wsThread = ws.getSubscription(`dialogs:${myId}`);
    wsThread.emit('message', {
      type: WsTypes.MESSAGE,
      receiverId: id,
      message: `${window.location.origin}/p/${postCode}`
    });
    if (message.length > 0 && message.length < 1000)
      wsThread.emit('message', {
        type: WsTypes.MESSAGE,
        receiverId: id,
        message
      });
    setIsDone(true);
    dispatch.auth.readDialog(id);
  };

  const onDoneClick = () => {
    close();
  };

  const onInputChange = useCallback(event => {
    setMessage(event.target.value);
  }, []);

  const search = username => {
    if(username.length > 0)
    setFetcher(() => (page) =>
      privateSearch(username, page));
    else {
      privateSearch(username, 0);
      setFetcher(null);
    }
  };

  return (
    <div className={isMobile() ? styles.mobileContainer : styles.container} style={{paddingBottom: isDone && '46px'}}>
      <Header src={src} onInputChange={onInputChange}/>
      <SearchInput search={search} className={styles.search}/>
      <ListOfUsers
        users={prepare(dialogs)}
        postCode={postCode}
        fetcher={fetcher}
        send={send}
      />
      {
        isDone && <button className={styles.doneButton} onClick={onDoneClick}>Done</button>
      }
    </div>
  )
};

Body.propTypes = {
  src: PropTypes.string.isRequired,
  myId: PropTypes.number,
  close: PropTypes.func.isRequired
};

export default connect(state => ({myId: state.auth.user.id}))(Body);
