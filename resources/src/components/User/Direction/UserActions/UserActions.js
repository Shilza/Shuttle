import React from "react";
import Modal from "../../../Modal/Modal";
import {Icon} from "antd";
import ActionsBody from "./ActionsBody";
import styles from './actionsModal.module.css';

class ActionsModal extends React.PureComponent {

    state = {
        isOpen: false
    };

    closeModal = () => {
        this.setState({isOpen: false});
    };

    open = () => {
        this.setState({isOpen: true});
    };

    render() {
        const {isOpen} = this.state;

        return (
            <>
                {
                    isOpen &&
                    <Modal closeModal={this.closeModal}>
                        <ActionsBody closeModal={this.closeModal}/>
                    </Modal>
                }
                <ActionsButton open={this.open}/>
            </>
        );
    }
}

const ActionsButton = ({open}) => (
    <button className={styles.actionsButton} onClick={open}>
        <Icon type="ellipsis" style={{marginLeft: 10}}/>
    </button>
);

export default ActionsModal;