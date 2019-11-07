import React, {useState} from "react";

import SearchInput from "components/SearchInput";
import {useSearch} from "hooks";
import Container from "../../Container";
import Header from "../../Header";
import UsersList from "../UsersList";

import MarkedUsers from "../MarkedUsers";
import styles from "../marks.module.css";

const VideoMarks = ({marks: defaultMarks, goBack, media}) => {

  const [marks, setMarks] = useState(defaultMarks);
  const [fetcher, setFetcher] = useState(null);
  const {users, search, resetSearch} = useSearch();

  const addUser = ({id, username, avatar}) => {
    const index = marks.findIndex(mark => mark.username === username);
    if (index === -1)
      marks.push({
        id,
        username,
        avatar
      });

    setMarks([...marks]);
    resetSearch();
    setFetcher(null);
  };

  const removeUser = (username) => {
    setMarks(marks.filter(mark => mark.username !== username));
  };

  const onChangeSearch = username => {
    if (username.length > 0)
      setFetcher(() => (page) => search(username, page));
    else {
      resetSearch();
      setFetcher(null);
    }
  };

  const goNext = () => {
    goBack(marks.map(({username}) => ({username})));
  };

  const back = () => {
    goBack();
  };

  return (
    <Container style={{height: 'fit-content'}}>
      <Header goBack={back} goNext={goNext} nextButtonText={'Done'} title={'Mark friends'}/>
      <div className={styles.searchContainer}>
        <SearchInput className={styles.searchInput} search={onChangeSearch} disabled={marks.length >= 10}/>
        <UsersList users={users} addUser={addUser} removeUser={removeUser} fetcher={fetcher}/>
      </div>
      <div className={styles.container}>
        <video className={styles.media} src={media}/>
        {
          marks && marks.length > 0 &&
          <MarkedUsers
            users={marks}
            removeUser={removeUser}
            className={styles.markedUsersContainer}
            onClickUser={(event) => event.preventDefault()}
          />
        }
      </div>
    </Container>
  );
};

export default VideoMarks;
