import React, {useState} from "react";
import PropTypes from 'prop-types';
import {OptionsModal as OModal} from 'ui';
import ModalBody from "./ModalBody";
import OptionsButton from "./OptionsButton";

const OptionsModal = ({post}) => {
  let [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const open = () => setIsModalOpen(true);

  return (
    <>
      <OModal visible={isModalOpen} onClose={closeModal}>
        <ModalBody closeModal={closeModal} post={post}/>
      </OModal>
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
