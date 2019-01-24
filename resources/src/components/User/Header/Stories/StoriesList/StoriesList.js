import styles from './storiesList.module.css';
import React from "react";
import {Story, UploadStory} from "../Story/Story";


const StoriesList = ({stories}) => (
    <div className={styles.container}>
        <UploadStory/>
        {
            stories.map((item, index) => <Story key={index} story={item}/>)
        }
    </div>
);

export default StoriesList;