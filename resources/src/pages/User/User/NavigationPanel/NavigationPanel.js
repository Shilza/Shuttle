import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Tabs} from 'antd';
import Saved from "./Saved/Saved";

import PostsManager from "./PostsManager/PostsManager";
import Marked from "./Marked";
import styles from './navigationPanel.module.css';

const TabPane = Tabs.TabPane;

const tabBarStyle = {color: 'var(--text)', borderBottom: '1px solid var(--accent-second)'};

const tabs = ['postsList', 'marks', 'saved'];

const NavigationPanel = ({me}) => {
  const [tab, setTab] = useState(tabs[0]);

  useLayoutEffect(() => {
    let { hash } = window.location;
    hash = hash.replace('#', '');
    if(me && tabs.includes(hash))
      setTab(hash);
    else if(hash !== 'saved' && tabs.includes(hash))
      setTab(hash);
  }, [window.location]);

  const changeTab = useCallback((tab) => {
    setTab(tab);
  }, []);

  return (
    <Tabs activeKey={tab} onTabClick={changeTab} className={styles.tabsContainer} tabBarStyle={tabBarStyle}>
      <TabPane tab="Posts" key={tabs[0]}>
        <PostsManager/>
      </TabPane>
      <TabPane tab="Marks" key={tabs[1]}>
        <Marked/>
      </TabPane>
      {
        me &&
        <TabPane tab="Saved" key={tabs[2]}>
          <Saved/>
        </TabPane>
      }
    </Tabs>
  );
};

NavigationPanel.propTypes = {
  me: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  me: state.users.user.id === state.auth.user.id
});

export default connect(mapStateToProps)(NavigationPanel);
