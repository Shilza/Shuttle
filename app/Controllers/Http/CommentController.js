'use strict';

const Comment = use('App/Models/Comment');
const Post = use('App/Models/Post');
const User = use('App/Models/User');
const Database = use('Database');
const {validate} = use('CValidator');

class CommentController {

    async show({request, response, auth}) {

        const rules = {
            post_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const page = parseInt(request.input('page'), 10);

        const comments = await Comment
            .query()
            .where('post_id', request.input('post_id'))
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 4);

        let owners = await Database
            .from('users')
            .whereIn('id', comments.rows.map(e => e.owner_id));
        owners = JSON.parse(JSON.stringify(owners));

        const user = await auth.getUser();
        let likes;
        if (user) {
            // get requester likes on comments by post
            likes = await Database
                .from('likes')
                .where('type', 2)
                .where('owner_id', user.id)
                .whereIn('entity_id', comments.rows.map(e => e.id));

            likes = JSON.parse(JSON.stringify(likes));
        }

        comments.rows = comments.rows.map(comment => {
            comment.owner = this.find(owners, comment.owner_id);
            // is comment liked by requester
            if (likes) {
                comment.isLiked = !!likes.find(like => {
                    if (like.entity_id === comment.id)
                        return true;
                });
            }

            return comment;
        });

        response.json(comments);
    }

    find(array, id) {
        const user = array.find(user => {
            if (user.id === id)
                return true;
        });

        return user.username;
    }

    async create({request, response, auth}) {

        const rules = {
            post_id: 'required|integer',
            text: 'required|string|min:0|max:1000'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const post_id = request.input('post_id');
        const user = await auth.getUser();
        const post = await Post.find(post_id);

        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        if (!user.canComment())
            return response.status(403).json({
                message: 'You cannot comment on this post'
            });

        let comment = await Comment.create({
            post_id,
            owner_id: user.id,
            text: request.input('text')
        });

        comment.owner = user.username;
        comment.isLiked = false;

        response.json({
            message: 'Comment successfully created',
            comment
        });
    }

    async update({request, response}) {
        const rules = {
            id: 'required|integer',
            text: 'required|string|min:1|max:1000'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });


        const comment = await Comment.find(request.input('id'));
        if (!comment)
            return response.status(400).json({
                message: 'Comment does not exists'
            });

        comment.text = request.input('text');
        comment.save();

        response.json({
            message: 'Comment successfully updated',
            comment
        });
    }

    async delete({request, response, auth}) {
        const rules = {
            comment_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const comment = await Comment.find(request.input('comment_id'));

        if (!comment) {
            return response.status(400).json({
                message: 'Comment does not exists'
            });
        }

        const user = await auth.getUser();
        const post = await comment.post().fetch();
        if (!user.isOwner(comment) && !user.isOwner(post.toJSON()))
            return response.status(403).json({
                message: 'Forbidden. Unable to delete'
            });

        await comment.delete();

        response.json({
            message: 'Comment successfully deleted'
        });
    }
}

module.exports = CommentController;
