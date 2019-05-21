import ExplainingLabel from "../ExplainingLabel";
import React from "react";
import styles from './styles.module.css';
import feed from './feed.svg';

const FeedExplainingLabel = () => (
    <div className={styles.container}>
        <ExplainingLabel icon={<img alt="user" src={feed} height={32}/>} text={'Feed'}>
        <span className={styles.text}>
            Here will be the latest publications of users on which you are subscribed
        </span>
        </ExplainingLabel>
    </div>
);

export default FeedExplainingLabel;


