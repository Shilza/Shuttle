import React, {useEffect} from "react";
import Login from "../../components/Welcome/Login/Login";
import {Card} from 'antd';
import styles from './welcome.module.css';
import shuttle from './images.png';
import {autoType} from "../../utils/autoType";

const Welcome = ({children = <Login/>}) => {

    useEffect(() => {
        autoType("type-js", 300);
    }, []);

    return (
        <div className={styles.welcome}>
            <div className="type-js headline">
                <h1 className="text-js">Shuttle!</h1>
            </div>
            <img className={styles.logo} src={shuttle} alt={'logo'}/>
            <Card className={styles.card}>
                {children}
            </Card>
        </div>
    );
};

export default Welcome;