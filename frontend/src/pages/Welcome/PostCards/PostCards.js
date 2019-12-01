import React, {useCallback, useLayoutEffect, useState} from "react";
import Card from "./Card";
import styles from './postCards.module.css';

const IMAGES = [
  'https://media.giphy.com/media/SB5fjrUhAeLte/giphy.gif',
  'https://media.giphy.com/media/sMaW02wUllmFi/giphy.gif',
  'https://media.giphy.com/media/NkJEXWDr7KsG4/giphy.gif',
  'https://media.giphy.com/media/l378AbkccL88mcB7W/giphy.gif',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_N-TKa4iKmYfKf-iBdtiSNvsGLDQG5xGqtHWOuxHhm0YF85OiFA&s',
  'https://www.ltutech.com/wp-content/uploads/2019/03/color-search-470x392.jpg',
  'https://www.familyvacationcritic.com/uploads/sites/19/2017/05/allincluwithairfare.jpg',
  'https://images2.minutemediacdn.com/image/upload/c_crop,h_1170,w_2084,x_0,y_0/f_auto,q_auto,w_1100/v1554918003/shape/mentalfloss/81904-istock-867774454.jpg',
  'http://pptstudios.nl/wp-content/uploads/2019/07/beautiful-free-professional-images-flowers-nature-border-powerpoint-awesome-flower-models-powerpoint-template.jpg'
];

const random = (mn, mx) => Math.random() * (mx - mn) + mn;

const getRandomInArray = (array) => array[Math.floor(random(0, array.length - 1))];

const genFooter = () => {
  const count = Math.floor(random(1, 3));
  let footer = [];
  if (count === 1)
    footer.push(random(50, 100));
  else {
    let first = random(30, 80);
    footer.push(first);
    footer.push(100 - first);
  }

  return footer;
};

const PostCards = () => {
  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    let posts = [];
    for (let i = 0; i < 10; ++i) {
      posts.push({
        isLiked: +(random(0, 5).toFixed()) === 4, // 20%
        url: getRandomInArray(IMAGES),
        footer: genFooter()
      });
    }
    setPosts(posts);
  }, []);

  const setIsLiked = useCallback((index) => () => {
    setPosts(posts.map((post, postIndex) => {
      if (index === postIndex)
        post.isLiked = !post.isLiked;
      return post;
    }))
  }, [posts]);

  return (
    <ul className={styles.container}>
      {
        posts.map((item, index) =>
          <Card
            key={index}
            url={item.url}
            isLiked={item.isLiked}
            onLike={setIsLiked(index)}
            footer={item.footer}
          />
        )
      }
    </ul>
  )
};

export default PostCards;
