import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from "react-router-dom";
import {Button, Drawer} from "antd";
import {connect} from "react-redux";

import SavedBarCompilationsList from "./Compilations/SavedBarCompilationsList";
import DrawerTitle from "./DrawerTitle";
import {setIsSavedTimeout, setPostToBeSaved} from "store/actions/saved";
import NewCompilationModal from "./Compilations/NewCompilationModal";

import styles from './savebar.module.css';
import transitions from './transitions.module.css';

const SaveBar = ({dispatch, isModalOpen, showBar, username}) => {
  let [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (!showBar)
      closeDrawer();
  }, [showBar]);

  const closeDrawer = () => {
    setDrawerVisible(false);
    dispatch(setPostToBeSaved(undefined));
  };

  const openDrawer = () => {
    setDrawerVisible(true);
    dispatch(setIsSavedTimeout(false));
  };

  return (
    <ReactCSSTransitionGroup
      transitionName={transitions}
      transitionAppear={false}
      transitionLeave={true}
      transitionEnter={true}
      transitionEnterTimeout={400}
      transitionLeaveTimeout={400}
      className={styles.transitionContainer}
    >
      {
        showBar &&
        <div className={styles.saveBar}>
          <button className={styles.buttonLink} onClick={openDrawer}>
            Choose compilation
          </button>
          <Link to={`/${username}`}>
            <Button size='small'>
              See compilations
            </Button>
          </Link>
        </div>
      }
      <Drawer
        height={'90%'}
        title={<DrawerTitle/>}
        placement={'bottom'}
        visible={drawerVisible}
        closable={false}
        zIndex={10000}
        onClose={closeDrawer}
      >
        <div className={styles.compilationsContainer}>
          <SavedBarCompilationsList/>
          <Button size={'small'} onClick={closeDrawer}>Cancel</Button>
        </div>
        {
          isModalOpen && <NewCompilationModal/>
        }
      </Drawer>
    </ReactCSSTransitionGroup>
  );
};

SaveBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  showBar: PropTypes.bool,
  username: PropTypes.string
};

const mapStateToProps = state => ({
  isModalOpen: state.saved.isModalOpen,
  username: state.auth.user.username
});

export default connect(mapStateToProps)(SaveBar);
