import React from "react";
import Username from "./Username";
import {connect} from "react-redux";
import Bio from "./Bio";
import Site from "./Site";
import styles from '../edit.module.css';
import {Button} from "antd";
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const EditBody = ({user}) => {
    return (
        <div className={styles.editContainer}>
            <ReactCSSTransitionGroup
                transitionName={transitions}
                transitionAppear={true}
                transitionAppearTimeout={450}
                transitionEnter={false}
                transitionLeave={false}
                style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            >
                <Username username={user.username}/>
                <Bio bio={user.bio}/>
                <Site bio={user.site}/>
                <Button size='small' type={'primary'}>Save</Button>
            </ReactCSSTransitionGroup>
        </div>
    );
};

export default connect(state => ({user: state.auth.user}))(EditBody);