import React, {useState} from 'react';
import Modal from "./Modal";
import {Button} from "ui";

export default {title: 'Modal'};

const withOpen = (Component) => () => {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => {
    setIsOpened(true);
  };

  const closeModal = () => {
    setIsOpened(false);
  };

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Component visible={isOpened} onClose={closeModal}/>
    </>
  )
};

export const simple = withOpen(
  ({visible, onClose}) => <Modal visible={visible} onClose={onClose}>Simple modal</Modal>
);

export const withoutCloseButton = withOpen(
  ({visible, onClose}) =>
    <Modal visible={visible} onClose={onClose} withCloseButton={false}>Modal without close button</Modal>
);
