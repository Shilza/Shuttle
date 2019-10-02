import React, {useRef} from "react"
import PropTypes from "prop-types"
import moment from "moment"

import {isMobile} from "utils/isMobile"
import TopPagination from "components/TopPagination"
import Loader from "components/Paginator/Loader"
import StartMessagingLabel from "components/ExplainingLabels/StartMessagingLabel/StartMessagingLabel"

import Message from "../Message"
import Slider from "./Slider"

import styles from "./messagesList.module.css"


const MessagesList = ({dialogs, getScrollParent, user, myId, getMessages, isFirstLoading}) => {

  let lastMessage = useRef(null);

  const isNeedAvatar = (messages, index) => {
    const prevMessage = messages[index - 1];
    if (Object.is(prevMessage, undefined))
      return true;

    return prevMessage && prevMessage.owner_id !== messages[index].owner_id
  };

  const messageDate = (created_at) => {
    let text;
    if (lastMessage.current) {
      let momentLst = moment(lastMessage.current);
      let momentCur = moment(created_at);

      if (momentLst.format("D MMMM YYYY") !== momentCur.format("D MMMM YYYY")) {
        if (momentLst.year() === momentCur.year()) {
          if (momentCur.format("D MMMM") === moment().format("D MMMM"))
            text = "today";
          else
            text = momentCur.format("D MMMM");
        } else
          text = momentCur.format("D MMMM YYYY");
      }
    } else {
      text = moment(created_at).format("D MMMM")
    }
    lastMessage.current = created_at;

    return text && <div className={styles.date}>{text}</div>;
  };

  return (
    <TopPagination
      fetcher={getMessages}
      loader={<Loader/>}
      withScrollHandler
      getScrollParent={getScrollParent}
      className={styles.container}
      toBottom
    >
      <Slider>
        <div className={isMobile() ? styles.mobileMessages : styles.messages}>
          <div className={styles.absoluteWrapper}>
            {
              !isFirstLoading && dialogs.length === 0 ?
                <div className={styles.explainingContainer}>
                  <StartMessagingLabel/>
                </div>
                :
                dialogs.map((message, index) => (
                    <>
                      {messageDate(message.created_at)}
                      <Message
                        key={message.id}
                        my={message.owner_id === myId}
                        avatar={user && user.avatar}
                        username={user && user.username}
                        withAvatar={isNeedAvatar(dialogs, index)}
                        text={message.text}
                        read={message.read}
                        time={message.created_at}
                        images={message.images}
                        post={message.post}
                      />
                    </>
                  )
                )
            }
          </div>
        </div>
      </Slider>
    </TopPagination>
  );
};

MessagesList.propTypes = {
  dialogs: PropTypes.array.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string
  }),
  myId: PropTypes.number.isRequired,
  getMessages: PropTypes.func.isRequired,
  isFirstLoading: PropTypes.bool.isRequired,
  getScrollParent: PropTypes.func.isRequired
};

export default MessagesList;
