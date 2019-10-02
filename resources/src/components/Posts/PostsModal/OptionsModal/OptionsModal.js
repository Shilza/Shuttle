import React, {useState} from "react";
import PropTypes from 'prop-types';
import Modal from "components/Modal/Modal";
import ModalBody from "./ModalBody";
import OptionsButton from "./OptionsButton";

const OptionsModal = ({post}) => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <>
      {
        isOpen &&
        <Modal closeModal={closeModal}>
          <ModalBody closeModal={closeModal} post={post}/>
        </Modal>
      }
      <OptionsButton open={open}/>
    </>
  );
};

OptionsModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    owner_id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  })
};

export default OptionsModal;
