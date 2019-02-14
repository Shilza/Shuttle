import React from "react";
import styles from './navigationPanel.module.css';
import {Tabs} from 'antd';
import Saved from "./Saved/Saved";
import MarksLabel from "../../ExplainingLabels/MarksLabel/MarksLabel";
import PostsManager from "./PostsManager/PostsManager";
import {connect} from "react-redux";

const TabPane = Tabs.TabPane;

const NavigationPanel = ({me}) => (
    <Tabs defaultActiveKey="1" className={styles.tabsContainer}>
        <TabPane tab="Posts" key="1">
            <PostsManager/>
        </TabPane>
        <TabPane tab="Marks" key="2">
            <MarksLabel/>
        </TabPane>
        {
            me && <TabPane tab="Saved" key="3">
                <Saved/>
            </TabPane>
        }
    </Tabs>
);

const mapStateToProps = state => ({
    me: state.users.user.id === state.auth.user.id
});

export default connect(mapStateToProps)(NavigationPanel);