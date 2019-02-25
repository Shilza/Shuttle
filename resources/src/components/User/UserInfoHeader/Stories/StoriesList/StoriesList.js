import styles from './storiesList.module.css';
import React from "react";
import {Story, UploadStory} from "../Story/Story";

const stories = [
    {
        src: 'https://www.itsnicethat.com/system/files/112017/5a0c24617fa44c187f000efc/index_default/Chris-(Simpsons-Artist)-The-Story-of-Life-publication-itsnicethat-list.png?1510746521'
    },
    {
        src: 'https://www.storynory.com/wp-content/uploads/2018/01/pot-of-broth-storynory-600-600x400.jpg',
        name: 'Stoory'
    }
];

const StoriesList = () =>
    <div className={styles.container}>
        <UploadStory/>
        {
            stories.map((item, index) => <Story key={index} story={item}/>)
        }
    </div>;

export default StoriesList;