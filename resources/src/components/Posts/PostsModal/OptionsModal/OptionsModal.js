import React from "react";
import Modal from "../../../Modal/Modal";
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
        const {post} = this.props;
        const link = window.location.origin + '/p/'+ post.src.match(/.+?\/.+?\/(.+?)\.+/)[1];

        return (
            <>
                {
                    isOpen &&
                    <Modal closeModal={this.closeModal}>
                        <ModalBody closeModal={this.closeModal} post_id={post.id} owner_id={post.owner_id} isArchived={post.archive} link={link}/>
                    </Modal>
                }
                <OptionsButton open={this.open}/>
            </>
        );
    }
}

export default OptionsModal;