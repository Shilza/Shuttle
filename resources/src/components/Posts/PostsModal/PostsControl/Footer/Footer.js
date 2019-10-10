import React from "react";
import PropTypes from 'prop-types';
import OptionsModal from "../../OptionsModal/OptionsModal";
import CommentInput from "../CommentInput/CommentInput";
import styles from '../postControl.module.css';

const Footer = ({post, onComment}) => (
  <div className={styles.footer}>
    <CommentInput
      post_id={post.id}
      onComment={onComment}
    />
    <OptionsModal post={post}/>
  </div>
);

Footer.propTypes = {
  post: PropTypes.object.isRequired,
  onComment: PropTypes.func
};

export default React.memo(Footer);
