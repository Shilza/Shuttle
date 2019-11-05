import React, {useEffect, useMemo} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import MessagesExplainingLabel from "components/ExplainingLabels/MessagesLabel/MessagesExplainingLabel";
import useDialogs from "hooks/useDialogs";
import {isMobile} from "utils/isMobile";

import ws, {types as WsTypes} from "../../Ws";

import DialogsList from "./DialogsList";

import styles from './dialogs.module.css';



const Dialogs = ({myId}) => {
  const {
    dialogs,
    addMessage,
    readAllMessages,
    search,
    setIsTyping,
    firstLoading,
    fetchDialogs,
    defaultDialogs
  } = useDialogs();

  const topicName = useMemo(() => `dialogs:${myId}`, [myId]);

  useEffect(() => {
    let wsThread = ws.getSubscription(topicName);

    const webSocketCallback = (data) => {
      switch (data.type) {
        case WsTypes.MESSAGE:
          addMessage(data.message);
          break;
        case WsTypes.CONNECTION:
          readAllMessages(data.receiver_id);
          break;
        case WsTypes.READ:
          readAllMessages(data.receiver_id);
          break;
        case WsTypes.IS_TYPING:
          setIsTyping(data.owner_id);
          break;
        default:
          break;
      }
    };

    if (wsThread) {
      wsThread.on('message', webSocketCallback);
      return () => wsThread.off('message', webSocketCallback);
    }
  }, []);

  return (
    <div className={isMobile() ? styles.mobileContainer : styles.container}>
      {
        firstLoading && defaultDialogs.length === 0 ?
          <div className={styles.labelContainer}>
            <MessagesExplainingLabel/>
          </div>
          :
          <DialogsList
            dialogs={dialogs}
            search={search}
            fetchDialogs={fetchDialogs}
            myId={myId}
          />
      }
    </div>
  )
};

Dialogs.propTypes = {
  myId: PropTypes.number.isRequired,
};

export default connect((state) => ({
  myId: state.auth.user.id
}))(Dialogs);

