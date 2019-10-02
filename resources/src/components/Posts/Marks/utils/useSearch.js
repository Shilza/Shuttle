import {useState} from "react";
import Http from "../../../../Http";

export const useSearch = () => {
  const [users, setUsers] = useState([]);

  const search = (username) => {
    if (username.length > 0)
      Http.get(`/api/v1/search?username=${username}`)
        .then(({data}) => {
          setUsers(data.data);
        });
    else
      setUsers([]);
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
