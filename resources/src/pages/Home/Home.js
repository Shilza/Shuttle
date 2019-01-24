import React from "react";
import styles from './home.module.css';
import Feed from "../../components/Feed/Feed";

const Home = () => {
    return (
        <>
            <div className={styles.container}>
                <Feed/>
            </div>
        </>
    );
};


export default Home;