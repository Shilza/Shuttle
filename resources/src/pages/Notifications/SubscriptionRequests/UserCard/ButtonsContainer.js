import React, {useState} from "react";
import {Button} from "antd";
import styles from './userCard.module.css';
import {acceptSubsRequest, cancelSubsRequest} from "../../../../services/subscriptionRequests";

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

export default React.memo(ButtonsContainer);