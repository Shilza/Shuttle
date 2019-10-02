import React, {useRef, useState} from "react";
import {connect} from 'react-redux';
import {message} from 'antd';
import TextareaAutosize from 'react-autosize-textarea';

import Marks from "components/Posts/Marks";
import Header from "components/Posts/Header";
import Container from "components/Posts/Container";
import PostMedia from "components/PostMedia";

import Http from 'Http';

import * as PostsActions from "store/actions/posts";

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
  let inputRef = useRef(null);

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
    const caption = inputRef.current.value;
    Http.patch('/api/v1/posts', {...editedPost, caption})
      .then(({data}) => {
        dispatch(PostsActions.updatePost(data.post));
        message.success(data.message);
      })
      .catch((err) => message.error(err.toString()))
      .finally(closeModal)
  };

  return (
    <>
      {
        isMarks
          ?
          <Marks
            goBack={setMarks}
            media={editedPost.src}
            marks={editedPost.marks}
            video={editedPost.src.match('.mp4')}
          />
          :
          <Container>
            <Header goNext={updatePost} goBack={closeModal} title={'Edit post'} nextButtonText={'Done'}/>
            <PostMedia media={editedPost.src} marks={editedPost.marks} postId={editedPost.id}/>
            <div className={styles.container}>
              <TextareaAutosize
                maxRows={8}
                className={styles.caption}
                placeholder={'Caption'}
                ref={inputRef}
                defaultValue={editedPost.caption}
                maxLength={1000}
              />
              <button className={styles.button} onClick={goToMarks}>Mark friends</button>
              <button className={styles.button}>Add place</button>
            </div>
          </Container>
      }
    </>
  )
};

export default connect()(Editor);
