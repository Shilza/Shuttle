import {Link} from "react-router-dom";
import React from "react";

import DefaultAvatar from "components/DefaultAvatar";

import styles from "./avatar.module.css";

const Avatar = React.memo(({my, post, images, username, src}) => (
  <>
    {
      !my && !post && !images &&
      <Link to={`/${username}`} className={styles.avatar}>
        {
          src ? <img src={src} alt={'avatar'}/> : <DefaultAvatar fontSize={'20px'}/>
        }
      </Link>
    }
  </>
));

export default Avatar;
