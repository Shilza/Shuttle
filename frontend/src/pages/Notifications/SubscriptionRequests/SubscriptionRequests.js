import React, {useEffect, useState} from "react";
import {SubscriptionRequestsService} from "services";
import SubRequestList from "./SubRequestsList";
import SubscriptionRequestsLabel from "./SubscriptionRequestsLabel";

const SubscriptionRequests = () => {

  let [isListOpen, setIsListOpen] = useState(false);
  let [avatar, setAvatar] = useState(undefined);
  let [count, setCount] = useState(0);

  useEffect(() => {
    SubscriptionRequestsService.getSubsRequestsPreview().then(({data: {avatar, count}}) => {
      setAvatar(avatar);
      setCount(count);
    });
  }, []);

  const openList = () => setIsListOpen(true);

  return (
    <>
      {
        isListOpen
          ? <SubRequestList/>
          : <SubscriptionRequestsLabel
            count={count}
            avatar={avatar}
            openList={openList}
          />
      }
    </>
  );
};

export default SubscriptionRequests;
