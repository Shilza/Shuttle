import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Tabs} from 'antd';
import Saved from "./Saved/Saved";

import PostsManager from "./PostsManager/PostsManager";
import Marked from "./Marked";
import styles from './navigationPanel.module.css';

const TabPane = Tabs.TabPane;

const NavigationPanel = ({me}) => (
  <Tabs defaultActiveKey="1" className={styles.tabsContainer}>
    <TabPane tab="Posts" key="1">
      <PostsManager/>
    </TabPane>
    <TabPane tab="Marks" key="2">
      <Marked/>
    </TabPane>
    {
      me &&
      <TabPane tab="Saved" key="3">
        <Saved/>
      </TabPane>
    }
  </Tabs>
);

NavigationPanel.propTypes = {
  me: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  me: state.users.user.id === state.auth.user.id
});

export default connect(mapStateToProps)(NavigationPanel);
