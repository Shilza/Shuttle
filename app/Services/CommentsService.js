const User = use('App/Models/User');
const Comment = use('App/Models/Comment');
const LikesService = use('LikesService');

class CommentsService {

  async getComments(userId, postId, page) {
    const comments = await Comment
      .query()
      .where('post_id', postId)
      .withCount('likes')
      .orderBy('created_at', 'desc')
      .paginate(page, 12);

    comments.rows = await this._setOwnersInfo(comments.rows);
    comments.rows = await LikesService.setIsLikedCommentsInfo(userId, comments.rows);

    return comments;
  }

  _findUserById(users, id) {
    return users.find(user => user.id === id);
  }

  async _getOwners(commentsIds) {
    const owners = await User
      .query()
      .select(['id', 'username', 'avatar'])
      .whereIn('id', commentsIds)
      .fetch();

    return owners.toJSON();
  }

  async _setOwnersInfo(comments) {
    let owners = await this._getOwners(comments.map(e => e.owner_id));

    return comments.map(comment => {
      const user = this._findUserById(owners, comment.owner_id);
      comment.owner = user.username;
      comment.avatar = user.avatar;

      return comment;
    });
  }
}

module.exports = CommentsService;
