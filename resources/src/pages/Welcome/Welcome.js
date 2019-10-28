import React from "react";
import PropTypes from 'prop-types';

import Login from "components/Welcome/Login/Login";
import logo from 'images/logo.png';
import styles from './welcome.module.css';

const Welcome = ({children = <Login/>}) => (
  <div className={styles.welcome}>
    <div className={styles.companyInfo}>
      <div className={styles.logoContainer}>
        <img src={logo} width={42} height={42} alt={'logo'}/>
        <h1 className={styles.title}>Shuttle</h1>
      </div>
      <span>Let's start with a progressive social network</span>
    </div>
    <div className={styles.card}>
      {children}
    </div>
  </div>
);

Welcome.propTypes = {
  children: PropTypes.node
};

export default Welcome;
