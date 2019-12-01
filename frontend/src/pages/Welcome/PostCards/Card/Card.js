import React from "react";
import PropTypes from 'prop-types';
import Like from "components/Posts/PostsModal/PostsControl/Actions/Like/Like";
import {Image} from "ui/Image";
import styles from './card.module.css';

const Card = ({url, footer, onLike, isLiked}) => (
  <div className={styles.container}>
    <div className={styles.header}>Nickname</div>
    <Image src={url} wrapperClassName={styles.img}/>
    <div className={styles.footer}>
      <div className={styles.footerStubsContainer}>
        {
          footer.map(width => <div className={styles.cardTextStub} style={{width: `${width}%`}}/>)
        }
      </div>
      <Like createLike={false} type='stub' id={1} isLiked={isLiked} onLike={onLike}/>
    </div>
  </div>
);

Card.propTypes = {
  url: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  footer: PropTypes.array.isRequired,
  isLiked: PropTypes.bool
};

export default Card;
