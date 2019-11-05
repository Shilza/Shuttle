import React, {useState} from "react";
import {OptionsModal} from 'ui';
import ActionsBody from "./ActionsBody";
import ActionsButton from "./ActionsButton";

const ActionsModal = () => {

  let [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const open = () => setIsModalOpen(true);

  return (
    <>
      <OptionsModal visible={isModalOpen} onClose={closeModal}>
        <ActionsBody closeModal={closeModal}/>
      </OptionsModal>
      <ActionsButton open={open}/>
    </>
  );
};

export default React.memo(ActionsModal);
