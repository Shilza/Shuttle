import React, {useState} from "react";
import Container from "../../Container";
import Header from "../../Header";
import UsersList from "../UsersList";
import Mark from "../../Mark/Mark";
import SearchInput from "components/SearchInput/SearchInput";
import {useSearch} from "../utils/useSearch";

import styles from "../marks.module.css";

const ImageMarks = ({marks: defaultMarks, goBack, media}) => {

  const [newMark, setNewMark] = useState(null);
  const [marks, setMarks] = useState(defaultMarks);
  const {users, search, resetSearch} = useSearch();

  const onImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setNewMark({
      top: y / (rect.height / 100),
      left: x / (rect.width / 100)
    })
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

  return (
    <Container style={{height: 'fit-content'}}>
      <Header goBack={back} goNext={goNext} nextButtonText={'Done'} title={'Mark friends'}/>
      {
        newMark && <SearchInput className={styles.searchInput} search={search}/>
      }
      <UsersList users={users} addUser={addUser} removeUser={removeUser}/>
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
