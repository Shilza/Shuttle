import React from "react"
import PropTypes from "prop-types"

import {isMobile} from "../../../utils/isMobile"
import TopPagination from "../../../components/TopPagination/TopPagination"
import Loader from "../../../components/Paginator/Loader/Loader"

import Message from "../Message/Message"

import styles from "./messagesList.module.css"

const MessagesList = ({dialogs, user, myId, getMessages}) => {

  const isNeedAvatar = (messages, index) => {
    const prevMessage = messages[index - 1];
    if (Object.is(prevMessage, undefined))
      return true;

    return prevMessage && prevMessage.owner_id !== messages[index].owner_id
  }

  return (
    <div className={isMobile() ? styles.mobileMessages : styles.messages}>
      <TopPagination
        fetcher={getMessages}
        loader={<Loader/>}
        withScrollHandler
        byWindow
      >
        {
          dialogs.map((dialog, index) =>
            <Message
              my={dialog.owner_id === myId}
              avatar={user && user.avatar}
              username={user && user.username}
              withAvatar={isNeedAvatar(dialogs, index)}
              text={dialog.message}
              read={dialog.read}
              key={dialog.id}
            />
          )
        }
      </TopPagination>
    </div>
  );
};

MessagesList.propTypes = {
  dialogs: PropTypes.array.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string
  }),
  myId: PropTypes.number.isRequired,
  getMessages: PropTypes.func.isRequired
};

export default MessagesList;
