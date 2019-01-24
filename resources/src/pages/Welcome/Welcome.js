import React from "react";
import Login from "../../components/Welcome/Login/Login";
import {Card} from 'antd';
import styles from './welcome.module.css';

const Welcome = ({children}) => (
    <div className={styles.welcome}>
        <Card className={styles.card}>
            {children}
        </Card>
    </div>
);

Welcome.defaultProps = {
    children: <Login/>
};

export default Welcome;