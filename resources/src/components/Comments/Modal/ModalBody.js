import ListModal from "../../Modal/ListModal";
import React from "react";

const ModalBody = ({closeModal, canDelete, removeComment}) =>
    <ListModal>
        {
            canDelete &&
            <li onClick={removeComment}>
                Delete
            </li>
        }
        <li>
            Reply
        </li>
        <li onClick={closeModal}>
            Cancel
        </li>
    </ListModal>;

export default ModalBody;