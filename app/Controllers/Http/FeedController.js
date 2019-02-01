'use strict';

const Feed = use('App/Models/Feed');
const Post = use('App/Models/Post');
const Compilation = use('App/Models/Compilation');
const Database = use('Database');
const {validate} = use('CValidator');

class FeedController {

    async show({request, response, auth}) {

        const rules = {
            page: 'integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const page = parseInt(request.input('page'), 10);

        const user = await auth.getUser();

        let posts = await this._getPosts(user.id, page);

        let likes;
        let commentLikes;
        if (user) {
            // get requester likes on post
            const ids = posts.data.map(e => e.id);
            likes = await this._getPostsLikes(user.id, ids);
            const ent_id = [];
            posts.data.forEach(post => post.comments.forEach(comment => ent_id.push(comment.id)));
            commentLikes = await this._getCommentsLikes(user.id, ent_id);
        }

        const postsOwnersIds = posts.data.map(e => e.owner_id);
        let postsOwners = await this._getPostsOwners(postsOwnersIds);

        let commentsOwnersIds = [];
        posts.data.forEach(post => post.comments.forEach(comment => commentsOwnersIds.push(comment.owner_id)));
        let commentsOwners = await this._getCommentsOwners(commentsOwnersIds);

        let savedPosts = await this._getSavedPostsId(user.id, posts.data.map(item => item.id));

        let comments = [];
        posts.data = posts.data.map(post => {
            const owner = postsOwners.find(owner => {

                if (owner.id === post.owner_id)
                    return true;
            });
            post.owner = owner.username;
            post.avatar = owner.avatar;

            // is post liked by requester
            if (likes) {
                post.isLiked = !!likes.find(like => {
                    if (like.entity_id === post.id)
                        return true;
                });
            }

            if (savedPosts) {
                post.isSaved = !!savedPosts.find(savedPost => {
                    if (savedPost === post.id)
                        return true;
                });
            }

            comments.push(...this._getResultedComments(
                commentsOwners, commentLikes, post.comments)
            );
            delete post.comments;

            return post;
        });

        posts.comments = comments;

        response.json(posts);
    }

    async _getSavedPostsId(userId, postsIds) {
        return await Compilation
            .query()
            .where('owner_id', userId)
            .whereIn('post_id', postsIds)
            .pluck('post_id');
    }

    async _getPosts(userId, page) {
        const postIds = await Feed
            .query()
            .where('receiver_id', userId)
            .pluck('post_id');

        let posts = await Post
            .query()
            .whereIn('id', postIds)
            .with('comments', builder => {
                builder.withCount('likes').limit(3)
            })
            .withCount('comments')
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 12);

        return posts.toJSON();
    }

    async _getPostsLikes(userId, ids) {
        let likes = await Database
            .from('likes')
            .where('type', 1)
            .where('owner_id', userId)
            .whereIn('entity_id', ids);

        return JSON.parse(JSON.stringify(likes));
    }

    async _getCommentsLikes(userId, ids) {
        // get requester likes on comments by post
        let commentLikes = await Database
            .from('likes')
            .where('type', 2)
            .where('owner_id', userId)
            .whereIn('entity_id', ids);

        return JSON.parse(JSON.stringify(commentLikes));
    }

    async _getPostsOwners(ids) {
        let postsOwners = await Database
            .select('id', 'username', 'avatar')
            .from('users')
            .whereIn('id', ids);

        return JSON.parse(JSON.stringify(postsOwners));
    }

    async _getCommentsOwners(ids) {
        return await Database
            .select('id', 'username')
            .from('users')
            .whereIn('id', ids);
    }

    _getResultedComments(commentsOwners, commentLikes, comments) {
        return comments.map(comment => {
            comment.owner = commentsOwners.find(owner => {
                if (owner.id === comment.owner_id)
                    return true
            }).username;

            // is comment liked by requester
            if (commentLikes) {
                comment.isLiked = !!commentLikes.find(like => {
                    if (like.entity_id === comment.id)
                        return true;
                });
            }

            return comment;
        });
    }
}

module.exports = FeedController;
