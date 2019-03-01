import React from "react";
import PropTypes from 'prop-types';
import {createPortal} from "react-dom";
import styles from './drawer.module.css';
import transitions from '../Drawer/transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Drawer = ({onClose, children, title}) => {

    const closeByCoverClick = event => {
        const id = event.target.id;
        if (id === 'transition')
            onClose();
    };

    return (
        createPortal(
            <div id='drawer'
                 className={styles.drawerContainer}
                 onClick={closeByCoverClick}>
                <ReactCSSTransitionGroup
                    id='transition'
                    className={styles.transitionContainer}
                    transitionName={transitions}
                    transitionAppear={true}
                    transitionAppearTimeout={250}
                    transitionEnter={false}
                    transitionLeaveTimeout={500}
                >
                    <div className={styles.wrapper}>
                        {title}
                        {children}
                    </div>
                </ReactCSSTransitionGroup>

            </div>,
            document.body
        )
    );
};

Drawer.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired
};

export default Drawer;