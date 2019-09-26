import React, {useState} from "react";

import SearchInput from "components/SearchInput";
import Mark from "components/Posts/Mark";
import Container from "../Container";
import Header from "../Header";
import UsersList from "./UsersList";

import Http from "../../../../../Http";

import styles from './marks.module.css';

const useSearch = () => {
  const [users, setUsers] = useState([]);

  const search = (event) => {
    Http.get(`/api/v1/search?username=${event.target.value}`)
      .then(({data}) => {
        setUsers(data.data);
      });
  };

  const resetSearch = () => {
    setUsers([]);
  };

  return {
    users,
    search,
    resetSearch
  }
};

const Marks = ({marks: defaultMarks, goBack, image}) => {

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

  const addUser = (username) => {
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

  return (
    <Container style={{height: 'fit-content'}}>
      <Header goBack={goBack} goNext={goNext} nextButtonText={'Done'} title={'Mark friends'}/>
      {
        newMark && <SearchInput className={styles.searchInput} search={search}/>
      }
      <div className={styles.container}>
        <UsersList users={users} addUser={addUser} removeUser={removeUser}/>
        <img src={image} onClick={onImageClick} className={styles.image} alt={'Post'}/>
        {
          newMark &&
          <Mark mark={newMark}/>
        }
        {
          marks && marks.map(mark => <Mark mark={mark} onClick={() => removeUser(mark.username)}/>)
        }
      </div>
    </Container>
  );
};

export default Marks;
