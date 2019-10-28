import React, {useState} from "react";
import PropTypes from "prop-types";
import {Drawer} from 'react-pretty-drawer';
import {connect} from "react-redux";
import {Button, message} from "antd";

import {isMobile} from "utils/isMobile";
import SimpleModal from "components/Modal/SimpleModal/SimpleModal";
import EditBody from "./EditBody/EditBody";

import EditTitle from "./EditTitle/EditTitle";
import {withRouter} from "react-router";
import styles from './edit.module.css';



const Edit = React.memo(({ dispatch, editedData, history, user }) => {

    let [isEditVisible, setIsEditVisible] = useState(false);

    const showDrawer = () => {
        setIsEditVisible(true);
    };

    const closeDrawer = () => {
        setIsEditVisible(false);
    };

  const submit = () => {
    const editedData = getFilterEditedData();

    if (Object.keys(editedData).length)
      dispatch.auth.update({editedData, history})
        .then((data) => {
          message.success(data.message);
          setIsEditVisible(false);
        })
        .catch((err) => message.error(err.response.data.message));
    else
      message.warning('Nothing to update');
  };

  const getFilterEditedData = () => {
    Object.entries(editedData).forEach(([key, value]) => {
      if (Object.is(value, undefined) || user[key] === value)
        delete editedData[key];
    });

    return editedData;
  };

    return <>
        <Button size='small' onClick={showDrawer} className={styles.editButton}>
            Edit
        </Button>
      {
          isMobile() ?
            <Drawer
              visible={isEditVisible}
              onClose={closeDrawer}
              className={styles.drawer}
              placement='bottom'
              height={'90%'}
            >
              <>
                <EditTitle onClose={closeDrawer} submit={submit}/>
                <EditBody/>
              </>
            </Drawer>
            : <SimpleModal
              title='Edit profile'
              className={styles.modal}
              visible={isEditVisible}
              onCancel={closeDrawer}
              onOk={submit}
            >
              <EditBody/>
            </SimpleModal>
      }
    </>;
});

Edit.propTypes = {
  editedData: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    site: PropTypes.string
  }),
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editedData: {
    username: state.edit.username,
    bio: state.edit.bio,
    site: state.edit.site
  },
  user: state.auth.user
});

export default connect(mapStateToProps)(withRouter(Edit));
