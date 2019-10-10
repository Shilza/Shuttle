import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, Form} from "antd";

import Modal from "components/Modal/Modal";
import {CompilationName} from "components//Fields/CompilationName";

import styles from './savedBarCompilations.module.css';

const NewCompilationModal = ({dispatch, form, postId, postSrc}) => {

  let [loading, setLoading] = useState(false);

  const closeModal = () => {
    dispatch.saved.setIsModalOpen(false);
  };

  const saveToNewCompilation = event => {
    event.preventDefault();

    form.validateFields((err, {compilationName}) => {
      if (!err) {
        setLoading(true);
        dispatch.posts.saveAsync({post_id: postId, compilation: compilationName})
          .then(closeModal);
      }
    });
  };

  return (
    <Modal onClose={closeModal} zIndex={10001} visible>
      <div className={styles.modalContainer}>
        <div className={styles.title}>New Compilation</div>
        <div className={styles.modalBody}>
          <img src={postSrc} alt={'Compilation cover'}/>
          <Form onSubmit={saveToNewCompilation} className={styles.modalBody}>
            <CompilationName className={styles.compilationName} getFieldDecorator={form.getFieldDecorator}/>
            <Button type={'primary'} htmlType="submit" loading={loading}>Save</Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

NewCompilationModal.propTypes = {
  postId: PropTypes.number.isRequired,
  postSrc: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  postId: state.saved.postToBeSaved && state.saved.postToBeSaved.id,
  postSrc: state.saved.postToBeSaved && state.saved.postToBeSaved.src
});

export default connect(mapStateToProps)(Form.create()(NewCompilationModal));
