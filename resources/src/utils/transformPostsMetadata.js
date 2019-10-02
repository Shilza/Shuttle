
export const transformPostsMetadata = posts =>
  posts.map(post => {
    if (post.hasOwnProperty('__meta__')) {
      Object.keys(post.__meta__).forEach(key =>
        post[key] = post.__meta__[key]
      );
      delete post.__meta__;
    }

    return post;
  });
