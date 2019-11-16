import React, {useState} from 'react';
import OptionsModal from "./OptionsModal";
import {Button} from "ui";

export default {title: 'OptionsModal'};

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
    <OptionsModal visible={visible} onClose={onClose}>
      <li>
        First
      </li>
      <li>
        Second
      </li>
      <li>
        Third
      </li>
      <li>
        Fourth
      </li>
    </OptionsModal>
);
