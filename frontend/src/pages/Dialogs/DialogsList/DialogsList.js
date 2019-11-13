import React from "react"
import PropTypes from "prop-types"

import SearchInput from "components/SearchInput";
import Paginator from "components/Paginator";

import Dialog from "../Dialog"

const DialogsList = React.memo(({dialogs, myId, fetchDialogs, search}) => (
  <>
    <SearchInput search={search}/>
    <Paginator fetcher={fetchDialogs}>
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
    </Paginator>
  </>
));

DialogsList.propTypes = {
  dialogs: PropTypes.array,
  myId: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
  fetchDialogs: PropTypes.func.isRequired
};

export default DialogsList;
