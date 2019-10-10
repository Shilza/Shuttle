import React, {useState} from "react";
import Modal from "components/Modal/Modal";
import ActionsBody from "./ActionsBody";
import ActionsButton from "./ActionsButton";

const ActionsModal = () => {

  let [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const open = () => setIsModalOpen(true);

  return (
    <>
      <Modal visible={isModalOpen} onClose={closeModal}>
        <ActionsBody closeModal={closeModal}/>
      </Modal>
      <ActionsButton open={open}/>
    </>
  );
};

export default React.memo(ActionsModal);
