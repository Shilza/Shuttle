import React, {useCallback, useState} from "react";

import Paginator from "components/Paginator";
import * as PostsService from 'services/posts';
import * as CommentsService from 'services/comments';

import User from "./User";

import styles from './modalBody.module.css';

const ModalBody = ({id, type}) => {
  const [users, setUsers] = useState([]);

  const fetcher = useCallback((page) => {
    let promise;
    if (type === 'post')
      promise = PostsService.getLikesUsers(id, page);
    else if (type === 'comment')
      promise = CommentsService.getLikesUsers(id, page);

    return promise.then(({data}) => {
      if (Array.isArray(data.data))
        setUsers(data.data);
      return data;
    })
  }, [id, type]);

  return (
    <Paginator fetcher={fetcher}>
      <div className={styles.container}>
        {
          users.map(user => <User key={user.id} username={user.username} avatar={user.avatar}/>)
        }
      </div>
    </Paginator>
  )
};

export default ModalBody;
