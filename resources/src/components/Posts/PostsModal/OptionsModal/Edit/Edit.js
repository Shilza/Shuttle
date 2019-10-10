import React, {useState} from "react";
import {Drawer} from "react-pretty-drawer";

import {isMobile} from "utils/isMobile";
import Modal from "components/Modal/Modal";
import Editor from "./Editor";

const Edit = ({post, closeModal}) => {

  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false)
  };

  return (
    <>
      <li onClick={open}>Edit</li>
      {
        isMobile()
          ? <Drawer visible={isOpen} placement={'bottom'} height={'100vh'}>
            <Editor post={post} closeModal={closeModal}/>
          </Drawer>
          :
          <Modal visible={isOpen} onClose={close}>
            <Editor post={post} closeModal={closeModal}/>
          </Modal>
      }
    </>
  );
};

export default Edit;
