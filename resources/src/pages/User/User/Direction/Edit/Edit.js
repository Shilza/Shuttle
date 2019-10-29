import React, {useState} from "react";
import PropTypes from "prop-types";
import {Drawer} from 'react-pretty-drawer';
import {connect} from "react-redux";
import {compose} from "redux";
import {Button, Form} from "antd";

import {isMobile} from "utils/isMobile";
import SimpleModal from "components/Modal/SimpleModal/SimpleModal";
import EditBody from "./EditBody/EditBody";

import EditTitle from "./EditTitle/EditTitle";
import {withRouter} from "react-router";
import styles from './edit.module.css';


const Edit = React.memo(({dispatch, history, form}) => {

  let [isEditVisible, setIsEditVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const showDrawer = () => {
    setIsEditVisible(true);
  };

  const closeDrawer = () => {
    setIsEditVisible(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        setIsLoading(true);
        dispatch.auth.update({values, history})
          .finally(() => {
            setIsLoading(false);
            setIsEditVisible(false);
          })
      }
    });
  };

  return <>
    <Button size='small' onClick={showDrawer} className={styles.editButton}>
      Edit
    </Button>
    <>
      {
        isMobile() ?
          <Drawer
            visible={isEditVisible}
            onClose={closeDrawer}
            className={styles.drawer}
            placement='bottom'
            height={'90%'}
          >
            <Form onSubmit={onSubmit}>
              <EditTitle onClose={closeDrawer} submit={onSubmit} isLoading={isLoading}/>
              <EditBody form={form}/>
            </Form>
          </Drawer>
          : <SimpleModal
            title='Edit profile'
            className={styles.modal}
            visible={isEditVisible}
            onCancel={closeDrawer}
            onOk={onSubmit}
            isLoading={isLoading}
          >
            <Form onSubmit={onSubmit}>
              <EditBody form={form} />
            </Form>
          </SimpleModal>
      }
    </>
  </>
});

Edit.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default compose(
  connect(),
  Form.create(),
  withRouter
)(Edit);
