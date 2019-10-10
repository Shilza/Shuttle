import React from "react";
import PropTypes from 'prop-types';
import styles from './story.module.css';

const Story = ({story}) =>
    <div className={styles.container}>
        <img src={story.src} className={styles.cover} alt={'Story'}/>
        <span>{story.name || 'Hightlits'}</span>
    </div>;


const UploadStory = () =>
    <div className={styles.container}>
            <span className={styles.addCover}>
                +
            </span>
        <span>Add story!</span>
    </div>;

Story.propTypes = {
    story: PropTypes.shape({
        src: PropTypes.string,
        name: PropTypes.string
    })
};

export {Story, UploadStory};