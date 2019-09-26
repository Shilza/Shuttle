import React from "react"
import PropTypes from "prop-types"

import SearchInput from "components/SearchInput/SearchInput";

import Dialog from "../Dialog/Dialog"

const DialogsList = React.memo(({dialogs, myId, search}) => (
  <>
    <SearchInput search={search}/>
    {
      dialogs.map(((item, index) =>
          <Dialog
            key={index}
            avatar={item.user.avatar}
            ownerId={item.owner_id}
            username={item.user.username}
            text={item.message}
            myId={myId}
            read={item.read}
            createdAt={item.created_at}
            isTyping={item.isTyping}
          />
      ))
    }
  </>
));

DialogsList.propTypes = {
  dialogs: PropTypes.array,
  myId: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired
};

export default DialogsList;
