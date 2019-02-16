const Action = use('App/Models/Action');
const Like = use('App/Models/Like');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Comment = use('App/Models/Comment');

class NotificationsService {

    async getNotifications(receiverId, page) {
        let notifications = await this._getNotifications(receiverId, page);

        let likesIds = [];
        let commentsIds = [];
        let usersIds = [];

        notifications.data.forEach(item => {
            switch (item.type) {
                case 1:
                    likesIds.push(item.entity_id);
                    break;
                case 2:
                    commentsIds.push(item.entity_id);
                    break;
            }
            usersIds.push(item.initiator_id);
        });

        const likes = await Like.query().select(['id', 'type', 'entity_id']).whereIn('id', likesIds).fetch();
        const comments = await Comment.query().select(['id', 'post_id', 'text']).whereIn('id', commentsIds).fetch();
        const users = await User.query().select(['id', 'username', 'avatar']).whereIn('id', usersIds).fetch();

        const posts = await this._getPosts(likes, comments);

        notifications.data = notifications.data.map(item => {
            const owner = users.rows.find(user => {
                if (user.id === item.initiator_id)
                    return true;
            });
            item.username = owner.username;
            item.avatar = owner.avatar;

            switch (item.type) {
                case 1:
                    likes.rows.forEach(like => {
                        if (like.id === item.entity_id) {
                            switch (like.type) {
                                case 1:
                                    item.post_src = (posts.rows.find(post => {
                                        if (post.id === like.entity_id)
                                            return true;
                                    })).src;
                                    item.info = 'liked your post';
                                    break;
                                case 2:
                                    comments.rows.forEach(comment => {
                                        if (comment.id === like.entity_id)
                                            item.post_src = (posts.rows.find(post => {
                                                if (post.id === comment.post_id)
                                                    return true;
                                            })).src;
                                    });
                                    item.info = 'liked your comment';
                                    break;
                            }
                        }
                    });
                    break;
                case 2:
                    item.info = 'comment your post';
                    comments.rows.forEach(comment => {
                        if (comment.id === item.entity_id) {
                            let text = comment.text;
                            if(comment.text.length > 20)
                                text = text.slice(0, 20) + '...';
                            item.text = text;
                            item.post_src = (posts.rows.find(post => {
                                    if (post.id === comment.post_id)
                                        return true;
                                }
                            )).src;
                        }
                    });
                    break;
                case 3:
                    item.info = 'follows you';
            }

            delete item.receiver_id;
            delete item.initiator_id;
            delete item.type;
            delete item.is_read;
            delete item.entity_id;

            return item;
        });

        return notifications;
    }

    async _getPosts(likes, comments) {
        const likedPostsIds = [];
        const likedCommentsIds = [];
        likes.rows.forEach(item => {
            if (item.type === 1)
                likedPostsIds.push(item.entity_id);
            else if (item.type === 2)
                likedCommentsIds.push(item.entity_id);
        });

        const likedComments = await Comment.query().select(['text', 'post_id']).whereIn('id', likedCommentsIds).fetch();
        const likedCommentsPostsIds = likedComments.rows.map(item => item.post_id);
        const commentsPostsIds = comments.rows.map(item => item.post_id);

        const postsIds = NotificationsService.arrayUnique(
            likedPostsIds.concat(likedCommentsPostsIds, commentsPostsIds)
        );

        return await Post.query().select(['id', 'src']).whereIn('id', postsIds).fetch();
    }

    async getNotificationsCount(receiverId) {
        return (await Action
            .query()
            .where('receiver_id', receiverId)
            .count())[0]['count(*)'];
    }

    async _getNotifications(receiverId, page) {
        return (await Action
            .query()
            .where('receiver_id', receiverId)
            .paginate(page, 30)).toJSON();
    }

    static arrayUnique(array) {
        let a = array.concat();
        for (let i = 0; i < a.length; ++i) {
            for (let j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }
}

module.exports = NotificationsService;