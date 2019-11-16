import React, {useState} from 'react';
import ListModal from "./ListModal";
import {Button} from "ui";

export default {title: 'ListModal'};

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
  ({visible, onClose}) =>
    <ListModal visible={visible} onClose={onClose}>
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
        <li>Fourth</li>
      </ul>
    </ListModal>
);

export const withTitle = withOpen(
  ({visible, onClose}) =>
    <ListModal visible={visible} onClose={onClose} title='Title'>
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
        <li>Fourth</li>
      </ul>
    </ListModal>
);
