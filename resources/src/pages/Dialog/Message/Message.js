import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import Linkify from 'linkifyjs/react'

import DefaultAvatar from "components/DefaultAvatar/DefaultAvatar"
import {getImagesUrl} from "utils/getImagesUrl";
import Image from "./Image/Image";
import Post from "./Post/Post";
import Http from '../../../Http';

import styles from "./message.module.css"

const Message = ({username, avatar, text, my, read, withAvatar = false}) => {
  const images = getImagesUrl(text);
  const withoutMediaLinks = text.replace(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif|mp4).*?(?=( |$))/g, '');
  const matches = text.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  const [post, setPost] = useState(matches && matches.length >= 2 && matches[1] === window.location.host && {});

  useEffect(() => {
    if (text) {
      if (!Object.is(post, null)) {
        let code = text.split('/')[4];
        Http.get(`/api/v1/posts/${code}`)
          .then(({data}) => {
            setPost(data.post);
          })
          .catch(err => setPost({error: err.message}))
      }
    }
  }, [text]);

  return (
    <>
      {
        post ? <Post post={post} my={my} postCode={text.split('/')[4]}/>
          : <>
            {
              withoutMediaLinks.length > 0 || (images && images.length > 1) ?
                <div className={my ? styles.myText : styles.container}>
                  {
                    !my && withAvatar &&
                    <Link to={`/${username}`} className={styles.avatar}>
                      {
                        avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'20px'}/>
                      }
                    </Link>
                  }
                  {my && !read && <div className={styles.myTextUnread}/>}
                  <Linkify className={!my && styles.text}>{withoutMediaLinks}</Linkify>
                  <div className={styles.imgContainer}>
                    {
                      images && images.map(image => <Image src={image}/>)
                    }
                  </div>
                </div>
                :
                <div className={my ? styles.myImgContainer : styles.imgContainer}>
                  {
                    images && images.map(image => <Image src={image}/>)
                  }
                </div>
            }
          </>
      }
    </>
  )
};

Message.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  my: PropTypes.bool.isRequired,
  read: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  withAvatar: PropTypes.bool
};

export default Message;
