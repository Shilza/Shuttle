import React, {useState} from "react";
import { message } from 'antd';
import Container from "../../Container";
import Header from "../../Header";
import UsersList from "../UsersList";
import Mark from "../../Mark/Mark";
import {useSearch} from "utils/useSearch";
import SearchInput from "components/SearchInput/SearchInput";

import styles from "../marks.module.css";

const ImageMarks = ({marks: defaultMarks, goBack, media}) => {

  const [newMark, setNewMark] = useState(null);
  const [marks, setMarks] = useState(defaultMarks);
  const [fetcher, setFetcher] = useState(null);
  const {users, search, resetSearch} = useSearch();

  const onImageClick = (event) => {
    if(marks.length < 10) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setNewMark({
        top: y / (rect.height / 100),
        left: x / (rect.width / 100)
      });
    } else {
      message.warning('Mark count must be less than 10');
    }
  };

  const addUser = ({username}) => {
    const index = marks.findIndex(mark => mark.username === username);
    if (index !== -1)
      marks[index] = {...marks[index], ...newMark};
    else
      marks.push({
        ...newMark,
        username
      });
    setMarks([...marks]);
    setNewMark(null);
    resetSearch();
    setFetcher(null);
  };

  const removeUser = (username) => {
    setMarks(marks.filter(mark => mark.username !== username));
  };

  const goNext = () => {
    goBack(marks);
  };

  const back = () => {
    goBack(marks);
  };

  const onChangeSearch = username => {
    if (username.length > 0)
      setFetcher(() => (page) => search(username, page));
    else {
      resetSearch();
      setFetcher(null);
    }
  };

  return (
    <Container style={{height: 'fit-content'}}>
      <Header goBack={back} goNext={goNext} nextButtonText={'Done'} title={'Mark friends'}/>
      <div className={styles.searchContainer}>
        {
          newMark && marks.length <= 10 &&
          <>
            <SearchInput className={styles.searchInput} search={onChangeSearch}/>
            <UsersList users={users} addUser={addUser} removeUser={removeUser} fetcher={fetcher}/>
          </>
        }
      </div>
      <div className={styles.container}>
        <img src={media} onClick={onImageClick} className={styles.media} alt={'Post'}/>
        {
          newMark &&
          <Mark mark={newMark}/>
        }
        {
          marks && marks.map(mark =>
            <Mark
              key={mark.username}
              mark={mark}
              onClick={() => removeUser(mark.username)}
            />
          )
        }
      </div>
    </Container>
  );
};

export default ImageMarks;
