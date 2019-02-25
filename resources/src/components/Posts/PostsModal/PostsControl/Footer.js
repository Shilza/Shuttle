import OptionsModal from "../OptionsModal/OptionsModal";
import styles from './postControl.module.css';
import React from "react";
import CommentInput from "./CommentInput";

const Footer = ({post}) =>
    <div className={styles.footer}>
        <CommentInput post_id={post.id}/>
        <OptionsModal post={post}/>
    </div>;

export default React.memo(Footer);