import React from "react";
import Modal from "../../../../Modal/Modal";
import ModalBody from "./ModalBody";
import OptionsButton from "./OptionsButton";

class OptionsModal extends React.PureComponent {

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
        const {post_id, owner_id} = this.props;

        return (
            <>
                {
                    isOpen &&
                    <Modal closeModal={this.closeModal}>
                        <ModalBody closeModal={this.closeModal} post_id={post_id} owner_id={owner_id}/>
                    </Modal>
                }
                <OptionsButton open={this.open}/>
            </>
        );
    }
}

export default OptionsModal;