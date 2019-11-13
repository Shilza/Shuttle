import React, {useState} from "react";
import PropTypes from 'prop-types';

import {Button} from 'ui';
import {SubscriptionRequestsService} from "services";

import styles from './userCard.module.css';

const ButtonsContainer = ({id, deleteFromSubsList}) => {

  let [acceptLoading, setAcceptLoading] = useState(false);
  let [cancelLoading, setCancelLoading] = useState(false);

  const accept = () => interactionWithSubRequest(SubscriptionRequestsService.acceptSubsRequest, () => (setAcceptLoading(false)));

  const cancel = () => interactionWithSubRequest(SubscriptionRequestsService.cancelSubsRequest, () => (setCancelLoading(true)));

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
      <Button loading={acceptLoading} onClick={accept}>
        Accept
      </Button>
      <Button loading={cancelLoading} onClick={cancel}>
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
