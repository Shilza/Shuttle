import {useEffect, useRef, useState} from "react"
import Http from "../../../Http"

const useDialogs = () => {
  const [dialogs, setDialogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let defaultDialogs = useRef([]);
  let typing = useRef([]);

  useEffect(() => {
    Http.get('/api/v1/dialogs')
      .then(({data}) => {
        defaultDialogs.current = data.data
        setDialogs(data.data)
        setIsLoading(false)
      });
  }, [])

  const search = (event) => {
    const username = event.target.value;
    if (username.length > 0) {
      const searchedDialogs = defaultDialogs.current.map(
        item => {
          if (item.user && item.user.username && item.user.username.startsWith(username))
            return item;
        }
      ).filter(Boolean);
      setDialogs(typeof searchedDialogs === 'undefined' ? [] : searchedDialogs);
    } else if (dialogs.length !== defaultDialogs.current.length) {
      setDialogs(defaultDialogs.current);
    }
  }

  const addMessage = (message) => {
    const index = defaultDialogs.current.findIndex(dialog => dialog.user.id === message.owner_id);
    if (index !== -1) {
      defaultDialogs.current = defaultDialogs.current.map(dialog => {
        if (dialog.user.id === message.owner_id)
          dialog = message
        return dialog;
      });
    } else
      defaultDialogs.current = [
        ...defaultDialogs.current,
        message
      ]

    defaultDialogs.current = defaultDialogs.current.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })
    setDialogs(defaultDialogs.current);
  }

  const readAllMessages = (id) => {
    setDialogs(
      defaultDialogs.current.map(dialog => {
        if (!dialog.read && dialog.user.id === id) {
          dialog.read = true;
          return {...dialog};
        }
        return dialog;
      }));
  };

  const setIsTyping = (id) => {
    // setTimeout(() => {
    //   typing.current = typing.current.filter(item => item.userId !== id);
    //
    // }, 1500);
  };

  return {
    dialogs,
    isLoading,
    addMessage,
    search,
    readAllMessages,
    setIsTyping,
    defaultDialogs: defaultDialogs.current
  }
}

export default useDialogs;
