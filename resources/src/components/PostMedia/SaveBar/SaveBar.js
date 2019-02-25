import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from './transitions.module.css';
import React, {useState} from "react";
import styles from './savebar.module.css';
import {Button, Drawer} from "antd";
import SavedBarCompilationsList from "./Compilations/SavedBarCompilationsList";
import DrawerTitle from "./DrawerTitle";
import {setIsSavedTimeout, setPostToBeSaved} from "../../../store/actions/saved";
import {connect} from "react-redux";
import NewCompilationModal from "./Compilations/NewCompilationModal";

const SaveBar = ({dispatch, isModalOpen}) => {

    let [drawerVisible, setDrawerVisible] = useState(false);

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
            transitionAppear={true}
            transitionLeave={true}
            transigionEnter={false}
            transitionAppearTimeout={250}
            transitionLeaveTimeout={500}
        >
            <div className={styles.saveBar}>
                <button className={styles.buttonLink} onClick={openDrawer}>
                    Choose compilation
                </button>
                <Button size='small'>See compilations</Button>
            </div>
            <Drawer
                height={'50%'}
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

const mapStateToProps = state => ({
    isModalOpen: state.saved.isModalOpen
});

export default connect(mapStateToProps)(SaveBar);