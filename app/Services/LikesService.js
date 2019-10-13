const Like = use('App/Models/Like');
const User = use('App/Models/User');

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

  async getUsersLikesByPostId(postId, page) {
    return await this.getUsersLikesByEntityId(1, postId, page);
  }

  async getUsersLikesByCommentId(commentId, page) {
    return await this.getUsersLikesByEntityId(2, commentId, page);
  }

  async getUsersLikesByEntityId(type, entityId, page) {
    const likes = await Like
      .query()
      .select(['owner_id'])
      .where('type', type)
      .where('entity_id', entityId)
      .orderBy('created_at', 'desc')
      .paginate(page, 30);

    likes.rows = (await User
      .query()
      .select(['id', 'username', 'avatar'])
      .whereIn('id', likes.rows.map(user => user.owner_id))
      .fetch()).rows;

    return likes;
  }

  async isLikeExists(ownerId, entityId, type) {
    return !!(await Like
      .query()
      .select(1)
      .where('owner_id', ownerId)
      .where('entity_id', entityId)
      .where('type', type)
      .first());
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

  async isPostLikedBy(userId, postId) {
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
