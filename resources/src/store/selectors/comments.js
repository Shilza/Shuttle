
export const getComments = (comments, post) => {
    let postComments = [];
    if (comments)
        comments.forEach(comment => {
            if (comment.post_id === post.id)
                postComments.push(comment);
        });

    return postComments;
};