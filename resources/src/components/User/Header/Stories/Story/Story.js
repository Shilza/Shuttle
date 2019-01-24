import React from "react";
import styles from './story.module.css';

const Story = ({story}) => (
    <div className={styles.container}>
        <img src={story.src} className={styles.cover}/>
        <span>{story.name || 'Hightlits'}</span>
    </div>
);


const UploadStory = () => (
    <div className={styles.container}>
            <span className={styles.addCover}>
                +
            </span>
        <span>Add story!</span>
    </div>
);


export {Story, UploadStory};