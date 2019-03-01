import React from "react";
import PropTypes from 'prop-types';
import OptionsModal from "../OptionsModal/OptionsModal";
import styles from './postControl.module.css';
import CommentInput from "./CommentInput";

const Footer = ({post}) =>
    <div className={styles.footer}>
        <CommentInput post_id={post.id}/>
        <OptionsModal post={post}/>
    </div>;

Footer.propTypes = {
    post: PropTypes.object.isRequired
};

export default React.memo(Footer);