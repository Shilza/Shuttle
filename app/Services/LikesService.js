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
        const likes = await Like
            .query()
            .where('type', 2)
            .where('owner_id', userId)
            .whereIn('entity_id', commentsIds)
            .fetch();

        return likes.toJSON();
    }

    async setIsLikedInfo(userId, entities) {
        const likes = await this.getUsersLikesByComments(
            userId, entities.map(e => e.id)
        );

        return entities.map(entity => {
            entity.isLiked = !!likes.find(like => {
                if (like.entity_id === entity.id)
                    return true;
            });

            return entity;
        });
    }

    async getUsersLikedPosts(userId) {
        return await Like
            .query()
            .where('owner_id', userId)
            .where('type', 1)
            .pluck('entity_id')
    }

    async _getCommentsLikes(userId, ids) {
        const commentLikes = await Like
            .query()
            .where('type', 2)
            .where('owner_id', userId)
            .whereIn('entity_id', ids)
            .fetch();

        return commentLikes.toJSON();
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