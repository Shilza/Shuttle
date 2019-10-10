import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {acceptSubsRequest, cancelSubsRequest} from "services/subscriptionRequests";
import styles from './userCard.module.css';

const ButtonsContainer = ({id, deleteFromSubsList}) => {

  let [acceptLoading, setAcceptLoading] = useState(false);
  let [cancelLoading, setCancelLoading] = useState(false);

  const accept = () => interactionWithSubRequest(acceptSubsRequest, () => (setAcceptLoading(false)));

  const cancel = () => interactionWithSubRequest(cancelSubsRequest, () => (setCancelLoading(true)));

  const interactionWithSubRequest = (loader, setStateCallback) => {
    setStateCallback();

    loader(id)
      .then(() => {
        setStateCallback();
        deleteFromSubsList(id);
      }).catch(() => setStateCallback());
  };

  return (
    <div className={styles.actionButtons}>
      <Button size={'small'}
              loading={acceptLoading}
              onClick={accept}
      >
        Accept
      </Button>
      <Button size={'small'}
              loading={cancelLoading}
              onClick={cancel}
      >
        Deny
      </Button>
    </div>
  );
};

ButtonsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  deleteFromSubsList: PropTypes.func.isRequired
};

export default React.memo(ButtonsContainer);
