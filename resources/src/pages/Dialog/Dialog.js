import React, {useCallback, useEffect, useRef, useState} from "react"
import PropTypes from "prop-types"

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

import MessagesList from "./MessagesList/MessagesList"
import BlacklistedExplainingLabel from "../../components/ExplainingLabels/BlacklistedLabel/BlacklistedExplainingLabel"
import Loader from "../../components/Paginator/Loader/Loader"

import {readDialog} from "../../store/actions/auth"
import Http from "../../Http"
import ws from "../../Ws"
import {types as WsTypes} from "../../Ws"
import {connect} from "react-redux"
import useMessages from "./utils/useMessages"

import styles from './dialog.module.css';


const Dialog = ({myId, dispatch, match}) => {

  const username = match.params.username;
  const [dialogUser, setDialogUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  let dialog = useRef(null);
  let timerRef = useRef(null);

  const {messages, getMessages, addMessage, readAllMessages, onNewMessage} = useMessages(username);

  useEffect(() => {
    Http.get('/api/v1/users?username=' + username)
      .then(({data}) => {
        setDialogUser(data);
        dispatch(readDialog(data.id));
      });
  }, []);

  useEffect(() => {
    onNewMessage(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
    window.scrollTo(0, document.body.scrollHeight);

    if (dialogUser) {
      const topicName = `dialogs:${myId}`
      let wsThread = ws.getSubscription(topicName);

      wsThread.emit('message', {
        type: WsTypes.CONNECTION,
        receiverId: dialogUser.id
      })

      const webSocketCallback = (data) => {
        switch (data.type) {
          case WsTypes.MESSAGE:
            addMessage(data.message);
            if (data.message.receiver_id === myId)
              wsThread.emit('message', {
                type: WsTypes.READ,
                receiverId: dialogUser.id
              });
            break;
          case WsTypes.CONNECTION:
            readAllMessages();
            break;
          case WsTypes.READ:
            readAllMessages();
            break;
          case WsTypes.IS_TYPING:
            if(data.owner_id === dialogUser.id) {
              const time = Date.now()
              setIsTyping(true);
              if(timerRef.current)
                clearInterval(timerRef.current)
              timerRef.current = setTimeout(() => {
                if(time + 1500 <= Date.now()) {
                  console.log('SET FALSE');
                  setIsTyping(false)
                }
              }, 1600);
            }
            break;
          default: break;
        }
      };

      wsThread.on('message', webSocketCallback);

      dialog.current = wsThread;

      return () => wsThread.off('message', webSocketCallback);
    }
  }, [dialogUser]);

  const sendMessage = useCallback((message) => {
    dialog.current.emit('message', {
      type: WsTypes.MESSAGE,
      receiverId: dialogUser.id,
      message
    })
  }, [dialog, dialogUser]);

  const typing = useCallback(() => {
    dialog.current.emit('message', {
      type: WsTypes.IS_TYPING,
      receiverId: dialogUser.id
    })
  }, [dialog, dialogUser]);

  return (
    <div className={styles.container}>
      {
        dialogUser ?
          <>
            {
              dialogUser && dialogUser.amBlacklisted ?
                <div className={styles.explainingContainer}>
                  <BlacklistedExplainingLabel/>
                </div>
                :
                <>
                  <Header username={username} avatar={dialogUser && dialogUser.avatar} isTyping={isTyping}/>
                  <MessagesList
                    dialogs={messages}
                    user={dialogUser}
                    myId={myId}
                    getMessages={getMessages}
                  />
                  <Footer sendMessage={sendMessage} typing={typing}/>
                </>
            }
          </>
          : <Loader center/>
      }
    </div>
  )
}

Dialog.propTypes = {
  myId: PropTypes.number.isRequired,
};

export default connect((state) => ({
  myId: state.auth.user.id
}))(Dialog);
