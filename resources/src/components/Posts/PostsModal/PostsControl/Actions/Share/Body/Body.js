import React, {useCallback, useMemo, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import SearchInput from "components/SearchInput/SearchInput";

import {isMobile} from "utils/isMobile";
import useDialogs from "utils/useDialogs"
import {readDialog} from "store/actions/auth";
import ws, {types as WsTypes} from "../../../../../../../Ws";

import Header from "./Header";
import ListOfUsers from "./ListOfUsers";

import styles from './body.module.css';

const Body = ({src, myId, close, dispatch}) => {

  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const {dialogs, search, fetchDialogs} = useDialogs();

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
    dispatch(readDialog(id));
  };

  const onDoneClick = () => {
    close();
  };

  const onInputChange = useCallback(event => {
    setMessage(event.target.value);
  }, []);

  return (
    <div className={isMobile() ? styles.mobileContainer : styles.container} style={{paddingBottom: isDone && '46px'}}>
      <Header src={src} onInputChange={onInputChange}/>
      <SearchInput search={search} className={styles.search}/>
      <ListOfUsers
        dialogs={dialogs}
        postCode={postCode}
        fetchDialogs={fetchDialogs}
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
