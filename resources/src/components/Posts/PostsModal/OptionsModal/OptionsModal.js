import React, {useState} from "react";
import Modal from "../../../Modal/Modal";
import ModalBody from "./ModalBody";
import OptionsButton from "./OptionsButton";

const OptionsModal = ({post}) => {

    let [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);

    const open = () => setIsOpen(true);

    const {id, owner_id, src} = post;

    const link = window.location.origin + '/p/' + src.match(/.+?\/.+?\/(.+?)\.+/)[1];

    return (
        <>
            {
                isOpen &&
                <Modal closeModal={closeModal}>
                    <ModalBody closeModal={closeModal} post_id={id} owner_id={owner_id}
                               isArchived={post.archive} link={link}/>
                </Modal>
            }
            <OptionsButton open={open}/>
        </>
    );
};

export default OptionsModal;