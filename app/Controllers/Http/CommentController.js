'use strict';

const Comment = use('App/Models/Comment');
const Post = use('App/Models/Post');
const {validate} = use('CValidator');
const LikesService = use('LikesService');
const CommentsService = use('CommentsService');

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

        let page = parseInt(request.input('page'), 10);
        page = page > 0 ? page : 1;

        const user = await auth.getUser();

        const comments = await CommentsService.getComments(
            user.id, request.input('post_id'), page
        );

        response.json(comments);
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

        response.json({comment});
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
