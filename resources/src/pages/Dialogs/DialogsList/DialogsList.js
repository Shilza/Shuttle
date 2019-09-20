import React from "react"
import {Icon} from "antd"
import PropTypes from "prop-types"

import Dialog from "../Dialog/Dialog"

import styles from "./messagesList.module.css"


const DialogsList = React.memo(({dialogs, myId, search}) => (
  <>
    <div className={styles.searchContainer}>
      <Icon type='search'/>
      <input placeholder='Search' maxLength='32' onChange={search}/>
    </div>
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
