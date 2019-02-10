import React from "react";
import styles from './navigationPanel.module.css';
import {Tabs} from 'antd';
import Saved from "./Saved/Saved";
import Marks from "./Marks/Marks";
import PostsManager from "./PostsManager/PostsManager";
import {connect} from "react-redux";
const TabPane = Tabs.TabPane;

const NavigationPanel = ({me}) => (
    <div className={styles.navigationContainer}>
        <Tabs defaultActiveKey="1" className={styles.tabsContainer}>
            <TabPane tab="Posts" key="1">
                <PostsManager/>
            </TabPane>
            <TabPane tab="Marks" key="2">
                <Marks/>
            </TabPane>
            {
                me && <TabPane tab="Saved" key="3">
                    <Saved/>
                </TabPane>
            }
        </Tabs>
    </div>
);

const mapStateToProps = state => ({
    me: state.users.user.id === state.auth.user.id
});

export default connect(mapStateToProps)(NavigationPanel);