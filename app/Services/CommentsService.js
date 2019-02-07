const User = use('App/Models/User');
const Comment = use('App/Models/Comment');
const LikesService = use('LikesService');

class CommentsService {

    async getComments(userId, postId, page) {
        const comments = await Comment
            .query()
            .where('post_id', postId)
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 4);

        comments.rows = await this._setOwnersInfo(comments.rows);
        comments.rows = await LikesService.setIsLikedInfo(userId, comments.rows);

        return comments;
    }

    _findUsernameById(array, id) {
        const user = array.find(user => {
            if (user.id === id)
                return true;
        });

        return user.username;
    }

    async _getOwners(commentsIds) {
        const owners = await User
            .query()
            .select(['id', 'username'])
            .whereIn('id', commentsIds)
            .fetch();

        return owners.toJSON();
    }

    async _setOwnersInfo(comments) {
        let owners = await this._getOwners(comments.map(e => e.owner_id));

        return comments.map(comment => {
            comment.owner = this._findUsernameById(owners, comment.owner_id);

            return comment;
        });
    }
}

module.exports = CommentsService;