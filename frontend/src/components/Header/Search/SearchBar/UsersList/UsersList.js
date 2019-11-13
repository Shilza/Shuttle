import React, {useCallback, useState} from "react";
import User from "./User";
import Paginator from "components/Paginator";

import styles from './styles.module.css';

export const UsersList = ({users, fetcher, closeBar}) => {

  const [firstLoading, setFirstLoading] = useState(false);

  const fetch = useCallback(page =>
    fetcher && fetcher(page).then((data) => {
      if(!firstLoading)
        setFirstLoading(true);
      return data;
    }), [fetcher, firstLoading]);

  return (
    <>
      {
        fetcher &&
        <div className={styles.usersList}>
          <Paginator fetcher={fetch}>
            <div className={styles.container}>
              {
                users.map(user =>
                  <User
                    closeBar={closeBar}
                    key={user.id}
                    username={user.username}
                    avatar={user.avatar}
                    bio={user.bio}
                  />
                )
              }
            </div>
          </Paginator>
        </div>
      }
      {
        firstLoading && users.length === 0 && <div className={styles.nothingToShow}>Nothing to show</div>
      }
    </>
  );
};
