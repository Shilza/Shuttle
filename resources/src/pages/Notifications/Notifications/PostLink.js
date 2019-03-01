import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import styles from './notifications.module.css';

const PostLink = ({link, postSrc}) => (
    <Link to={link} className={styles.postLink}>
        <img src={postSrc} alt={'Post mini pic'}/>
    </Link>
);

PostLink.propTypes = {
    link: PropTypes.string,
    postSrc: PropTypes.string.isRequired
};

export default PostLink;