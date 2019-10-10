import React, {useCallback, useState} from "react";
import {connect} from 'react-redux';
import {message} from 'antd';
import TextareaAutosize from 'react-autosize-textarea';

import Marks from "components/Posts/Marks";
import Header from "components/Posts/Header";
import Container from "components/Posts/Container";
import PostMedia from "components/PostMedia";

import styles from './editor.module.css';

const preparePost = ({id, owner_id, marks, caption, src, created_at}) => ({
  id,
  owner_id,
  marks,
  caption,
  src,
  created_at
});

const Editor = ({post, closeModal, dispatch}) => {
  const [isMarks, setIsMarks] = useState(false);
  const [editedPost, setEditedPost] = useState(preparePost(post));
  const [caption, setCaption] = useState(editedPost.caption);

  const goToMarks = () => {
    setIsMarks(true);
  };

  const setMarks = (marks) => {
    if (marks)
      setEditedPost({
        ...editedPost,
        marks
      });
    setIsMarks(false);
  };

  const updatePost = () => {
    dispatch.posts.updateAsync({...editedPost, caption})
      .then((data) => {
        message.success(data.message);
      })
      .catch((err) => message.error(err.toString()))
      .finally(closeModal)
  };

  const onCaptionChange = useCallback((event) => {
    setCaption(event.target.value);
  }, []);

  return (
    <>
      {
        isMarks
          ?
          <Marks
            goBack={setMarks}
            media={editedPost.src}
            marks={editedPost.marks}
            video={!!editedPost.src.match('.mp4')}
          />
          :
          <Container>
            <Header goNext={updatePost} goBack={closeModal} title={'Edit post'} nextButtonText={'Done'}/>
            <div className={styles.wrapper}>
              <PostMedia media={editedPost.src} marks={editedPost.marks} postId={editedPost.id}/>
              <div className={styles.container}>
                <TextareaAutosize
                  maxRows={8}
                  className={styles.caption}
                  placeholder={'Caption'}
                  onChange={onCaptionChange}
                  defaultValue={caption}
                  maxLength={1000}
                />
                <button className={styles.button} onClick={goToMarks}>Mark friends</button>
                <button className={styles.button}>Add place</button>
              </div>
            </div>
          </Container>
      }
    </>
  )
};

export default connect()(Editor);
