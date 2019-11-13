import React, {useCallback, useState} from "react";
import {connect} from 'react-redux';
import {message} from 'antd';
import TextareaAutosize from 'react-autosize-textarea';

import {Button} from 'ui';
import Marks from "components/Posts/Marks";
import Header from "components/Posts/Header";
import Container from "components/Posts/Container";
import PostMedia from "components/PostMedia";
import Location from "components/Posts/Location";

import styles from './editor.module.css';

const preparePost = ({id, owner_id, marks, caption, src, location, created_at}) => ({
  id,
  owner_id,
  marks,
  caption,
  src,
  location,
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

  const setLocation = (location) => {
    setEditedPost({
      ...editedPost,
      location
    })
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
                <label className={styles.label}>
                  <span className={styles.labelText}>Caption</span>
                  <TextareaAutosize
                    maxRows={8}
                    className={styles.caption}
                    placeholder={'Enter caption'}
                    onChange={onCaptionChange}
                    defaultValue={caption}
                    maxLength={1000}
                  />
                </label>
                <Location onChange={setLocation} defaultLocation={post.location}/>
                <Button className={styles.button} onClick={goToMarks}>Mark friends</Button>
              </div>
            </div>
          </Container>
      }
    </>
  )
};

export default connect()(Editor);
