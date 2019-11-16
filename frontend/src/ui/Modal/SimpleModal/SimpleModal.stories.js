import React, {useState} from 'react';
import SimpleModal from "./SimpleModal";
import {Button} from "ui";

export default {title: 'SimpleModal'};

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

export const withTitle = withOpen(
  ({visible, onClose}) => <SimpleModal title='Title' visible={visible} onCancel={onClose}>Body</SimpleModal>
);

export const withCancel = withOpen(
  ({visible, onClose}) => <SimpleModal visible={visible} onCancel={onClose}>Body</SimpleModal>
);

export const withOk = withOpen(
  ({visible, onClose}) => <SimpleModal visible={visible} onCancel={onClose} onOk={onClose}>Body</SimpleModal>
);

export const customCancelButtonText = withOpen(
  ({visible, onClose}) =>
    <SimpleModal visible={visible} onCancel={onClose} onOk={onClose} cancelButtonText='Custom cancel text'>Body</SimpleModal>
);

export const customOkButtonText = withOpen(
  ({visible, onClose}) =>
    <SimpleModal visible={visible} onCancel={onClose} onOk={onClose} okButtonText='Custom ok text'>Body</SimpleModal>
);
