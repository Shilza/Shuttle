import ExplainingLabel from "../ExplainingLabel";
import React from "react";
import SvgIcon from "components/SvgIcon";
import feed from './feed.svg';
import styles from './styles.module.css';

const FeedExplainingLabel = () => (
    <div className={styles.container}>
        <ExplainingLabel icon={<SvgIcon title="Feed" src={feed} className={styles.icon}/>} text={'Feed'}>
        <span className={styles.text}>
            Here will be the latest publications of users on which you are subscribed
        </span>
        </ExplainingLabel>
    </div>
);

export default FeedExplainingLabel;


