import React, {useCallback, useState} from "react"
import PropTypes from "prop-types"
import Linkify from 'linkifyjs/react'
import moment from "moment";

import OptionsModal from "components/Modal/OptionsModal";
import Modal from "components/Modal";

import Post from "./Post";
import Avatar from "./Avatar";
import Images from "./Images";
import SingleImage from "./Images/SingleImage";

import styles from "./message.module.css";


const Message = ({id, username, avatar, post, images, text, my, read, time, deleteMsg, withAvatar = false}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    if (my)
      setModalVisible(true);
  };

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const deleteMessage = useCallback(() => {
    deleteMsg(id);
  }, []);

  return (
    <>
      <div className={my ? styles.myWrapper : styles.wrapper} onClick={openModal}>
        {withAvatar && <Avatar my={my} post={post} src={avatar} images={images} username={username}/>}
        {
          post
            ? <Post post={post} my={my} postCode={text.split('/')[4]}/>
            : <div className={styles.container}>
              {
                text.length > 0 || (images && images.length > 1) ?
                  <div className={my ? styles.myText : styles.text}>
                    {my && !read && <div className={styles.unreadBadge}/>}
                    <Linkify>{text}</Linkify>
                    <Images images={images}/>
                  </div>
                  :
                  <SingleImage my={my} images={images}/>
              }
            </div>
        }
        <time className={my ? styles.myTime : styles.time}>{moment(time).format('HH:mm')}</time>
      </div>
      <Modal visible={modalVisible} onClose={closeModal}>
        <OptionsModal>
          {
            moment().diff(time, 'hours') <= 24 &&
            <li onClick={deleteMessage}>Delete</li>
          }
          <li onClick={closeModal}>Cancel</li>
        </OptionsModal>
      </Modal>
    </>
  );
};

Message.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  my: PropTypes.bool.isRequired,
  read: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  withAvatar: PropTypes.bool,
  deleteMsg: PropTypes.func.isRequired
};

export default Message;
