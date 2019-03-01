import React, {useState} from "react";
import Modal from "../../../Modal/Modal";
import ActionsBody from "./ActionsBody";
import ActionsButton from "./ActionsButton";

const ActionsModal = () => {

    let [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);

    const open = () => setIsOpen(true);

    return (
        <>
            {
                isOpen &&
                <Modal closeModal={closeModal}>
                    <ActionsBody closeModal={closeModal}/>
                </Modal>
            }
            <ActionsButton open={open}/>
        </>
    );
};

export default React.memo(ActionsModal);