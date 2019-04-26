'use strict';

const Feed = use('App/Models/Feed');
const Post = use('App/Models/Post');
const User = use('App/Models/User');
const LikesService = use('LikesService');
const CompilationsService = use('CompilationsService');

class PostsService {

    async getPostByCode(code, user) {
        let post = await Post
            .query()
            .where('src', 'like', '%' + code + '%')
            .withCount('comments')
            .withCount('likes')
            .first();

        if (!post)
            return false;

        post.isLiked = await LikesService.isPostLikedBy(user.id, post.id);
        post.isSaved = await CompilationsService.isSavedBy(user.id, post.id);

        const owner = await User.find(post.owner_id);
        post.owner = owner.username;
        post.avatar = owner.avatar;

        return post;
    }

    async getCompilationsPosts(userId, compilationName, page) {
        const postsIds = await CompilationsService.getPostsIdsByCompilationName(
            userId, compilationName
        );

        let posts = await Post
            .query()
            .whereIn('id', postsIds)
            .withCount('comments')
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 12);

        posts.rows = await this._setOwnersInfo(posts.rows);
        posts.rows = await LikesService.setIsLikedPostsInfo(userId, posts.rows);

        return posts;
    }

    async getFeedPosts(userId, page) {
        let posts = await this._getFeedPosts(userId, page);

        posts.data = await this._setOwnersInfo(posts.data);
        posts.data = await LikesService.setIsLikedPostsInfo(userId, posts.data);
        posts.data = await CompilationsService.setSavedInfo(userId, posts.data);
        posts.comments = await this.getResultedComments(userId, posts.data);
        posts.data = posts.data.map(post => {
            delete post.feedComments;

            return post;
        });

        return posts;
    }

    async getArchivedPosts(user, page) {
        const posts = await Post
            .query()
            .where('owner_id', user.id)
            .withCount('comments')
            .withCount('likes')
            .archived()
            .orderBy('id', 'desc')
            .paginate(page, 12);

        posts.rows = this._setOwnerInfo(user, posts.rows);
        posts.rows = await LikesService.setIsLikedPostsInfo(user.id, posts.rows);

        return posts;
    }

    async getLikedPosts(userId, page) {
        const postsIds = await LikesService.getUsersLikedPosts(userId);

        let likedPosts = await Post
            .query()
            .whereIn('id', postsIds)
            .withCount('comments')
            .withCount('likes')
            .notArchived()
            .orderBy('id', 'desc')
            .paginate(page, 12);

        likedPosts.rows = await this._setOwnersInfo(likedPosts.rows);
        likedPosts.rows = likedPosts.rows.map(post => {
            post.isLiked = true;

            return post;
        });

        return likedPosts;
    }

    async getPostsOwnerByPostId(postId) {
        const userId = (await Post
            .query()
            .where('id', postId)
            .pluck('owner_id'))[0];

        return await User.find(userId);
    }

    async getPostsOwnerByPostCode(code) {
        let userId = (await Post
            .query()
            .where('src', 'like', '%' + code + '%')
            .pluck('owner_id'))[0];

        return await User.find(userId);
    }

    async getResultedComments(userId, posts) {
        let comments = [];

        const ent_id = [];
        posts.forEach(post => post.feedComments.forEach(comment => ent_id.push(comment.id)));
        let commentLikes = await LikesService.getCommentsLikes(userId, ent_id);

        let commentsOwnersIds = [];
        posts.forEach(post => post.feedComments.forEach(comment => commentsOwnersIds.push(comment.owner_id)));
        let commentsOwners = await this._getCommentsOwners(commentsOwnersIds);

        posts.forEach(post => {
            comments.push(...this._getResultedComments(
                commentsOwners, commentLikes, post.feedComments)
            );
        });

        return comments;
    }

    async getPostsByOwner(ownerId, userId, page) {
        let posts = await Post
            .query()
            .where('owner_id', ownerId)
            .withCount('comments')
            .withCount('likes')
            .notArchived()
            .orderBy('id', 'desc')
            .paginate(page, 12);

        const owner = await User.find(ownerId);

        posts.rows = this._setOwnerInfo(owner, posts.rows);
        posts.rows = await LikesService.setIsLikedPostsInfo(userId, posts.rows);
        posts.rows = await CompilationsService.setSavedInfo(userId, posts.rows);

        return posts;
    }

    async _getFeedPosts(userId, page) {
        const postIds = await Feed
            .query()
            .where('receiver_id', userId)
            .pluck('post_id');

        let posts = await Post
            .query()
            .whereIn('id', postIds)
            .withCount('comments')
            .withCount('likes')
            .notArchived()
            .orderBy('id', 'desc')
            .paginate(page, 12);

        let comments = [];
        posts.rows.forEach(post => {
            comments.push(post.load('feedComments'));
        });
        await Promise.all(comments);

        return posts.toJSON();
    }

    async _getPostsOwners(postsIds) {
        console.log('owners2');
        const owners = await User
            .query()
            .select(['id', 'username', 'avatar'])
            .whereIn('id', postsIds)
            .fetch();

        return owners.toJSON();
    }

    async _getCommentsOwners(ids) {
        const owners = await User
            .query()
            .select('id', 'username')
            .whereIn('id', ids)
            .fetch();

        return owners.toJSON();
    }

    _getResultedComments(commentsOwners, commentLikes, comments) {
        return comments.map(comment => {
            comment.owner = commentsOwners.find(owner => {
                if (owner.id === comment.owner_id)
                    return true
            }).username;

            if (commentLikes) {
                comment.isLiked = !!commentLikes.find(like => {
                    if (like.entity_id === comment.id)
                        return true;
                });
            }

            return comment;
        });
    }

    _setOwnerInfo(user, posts) {
        return posts.map(post => {
            post.owner = user.username;
            post.avatar = user.avatar;

            return post;
        });
    }

    async _setOwnersInfo(posts) {
        const owners = await this._getPostsOwners(posts.map(e => e.owner_id));

        return posts.map(post => {
            post.owner = this._findUserById(owners, post.owner_id).username;
            post.avatar = this._findUserById(owners, post.owner_id).avatar;

            return post;
        });
    }

    _findUserById(array, id) {
        return array.find(user => {
            if (user.id === id)
                return true;
        });
    }
}

module.exports = PostsService;