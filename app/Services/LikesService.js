const Like = use('App/Models/Like');

class LikesService {
    async getUsersLikesByPosts(userId, postsIds) {
        const likes = await Like
            .query()
            .where('type', 1)
            .where('owner_id', userId)
            .whereIn('entity_id', postsIds)
            .fetch();

        return likes.toJSON();
    }

    async getUsersLikesByComments(userId, commentsIds) {
        return await Like
            .query()
            .where('type', 2)
            .where('owner_id', userId)
            .whereIn('entity_id', commentsIds)
            .pluck('entity_id');
    }

    async getUsersLikesByPosts(userId, postsIds) {
        return await Like
            .query()
            .where('type', 1)
            .where('owner_id', userId)
            .whereIn('entity_id', postsIds)
            .pluck('entity_id');
    }

    async setIsLikedCommentsInfo(userId, comments) {
        const likes = await this.getUsersLikesByComments(
            userId, comments.map(e => e.id)
        );

        return this._isLikedInfo(comments, likes);
    }

    async setIsLikedPostsInfo(userId, posts) {
        const likes = await this.getUsersLikesByPosts(
            userId, posts.map(e => e.id)
        );

       return this._isLikedInfo(posts, likes);
    }

    async getUsersLikedPosts(userId) {
        return await Like
            .query()
            .where('owner_id', userId)
            .where('type', 1)
            .pluck('entity_id')
    }

    async getCommentsLikes(userId, ids) {
        const commentLikes = await Like
            .query()
            .where('type', 2)
            .where('owner_id', userId)
            .whereIn('entity_id', ids)
            .fetch();

        return commentLikes.toJSON();
    }

    _isLikedInfo(entities, likes) {
        return entities.map(entity => {
            entity.isLiked = !!likes.find(like => {
                if (like === entity.id)
                    return true;
            });

            return entity;
        });
    }

    async _isCommentLikedBy(userId, commentId) {
        let like = await Like
            .query()
            .select(1)
            .where('type', 2)
            .where('owner_id', userId)
            .where('entity_id', commentId)
            .fetch();

        return !!like.rows.length;
    }

    async _isPostLikedBy(userId, postId) {
        let like = await Like
            .query()
            .select(1)
            .where('type', 1)
            .where('owner_id', userId)
            .where('entity_id', postId)
            .fetch();

        return !!like.rows.length;
    }
}

module.exports = LikesService;