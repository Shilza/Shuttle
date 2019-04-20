'use strict';

const Comment = use('App/Models/Comment');
const Post = use('App/Models/Post');
const {validate} = use('CValidator');
const CommentsService = use('CommentsService');
const UsersService = use('UsersService');
const PostsService = use('PostsService');

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

        const postId = request.input('post_id');
        const user = await auth.getUser();

        const owner = await PostsService.getPostsOwnerByPostId(postId);

        const canSee = await UsersService.canSee(owner, user.id);
        if (canSee) {
            const comments = await CommentsService.getComments(user.id, postId, page);
            return response.json(comments);
        } else
            return response.json({private: true});
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

        let comment = await Comment.create({
            post_id,
            owner_id: user.id,
            text: request.input('text')
        });

        comment.owner = user.username;
        comment.isLiked = false;

        response.json({comment});
    }

    async update({request, response, auth}) {
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

        const user = await auth.getUser();
        if (user.isOwner(comment)) {
            comment.text = request.input('text');
            comment.save();

            return response.json({
                message: 'Comment successfully updated'
            });
        }

        response.status(403).json({
            message: 'Forbidden. Unable to update'
        });
    }

    async delete({request, response, auth}) {
        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const comment = await Comment.find(request.input('id'));

        if (!comment) {
            return response.status(400).json({
                message: 'Comment does not exists'
            });
        }

        const user = await auth.getUser();
        const post = await comment.post().fetch();
        if (user.isOwner(comment) || user.isOwner(post.toJSON())) {
            await comment.delete();

            return response.json({
                message: 'Comment successfully deleted'
            });
        }

        response.status(403).json({
            message: 'Forbidden. Unable to delete'
        });
    }
}

module.exports = CommentController;
