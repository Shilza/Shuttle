import React from "react";
import styles from './marksExplaining.module.css';
import ExplainingLabel from "../ExplainingLabel";

const MarksLabel = () => (
    <ExplainingLabel icon={<div className={styles.eye}/>} text='Marks'>
        <span>
            Here you can see the photos in which you are marked
        </span>
    </ExplainingLabel>
);

export default MarksLabel;