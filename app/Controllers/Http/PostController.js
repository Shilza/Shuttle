'use strict';

const Post = use('App/Models/Post');
const User = use('App/Models/User');
const Feed = use('App/Models/Feed');
const Friendship = use('App/Models/Friendship');
const {validate} = use('CValidator');
const PostsService = use('PostsService');
const CompilationsService = use('CompilationsService');
const LikesService = use('LikesService');

class PostController {

    async showPostByCode({request, response, auth, params}) {

        const user = await auth.getUser();

        const post = await PostsService.getPostByCode(user, params.code);
        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        response.json({post});
    }

    async show({request, response, auth}) {

        const rules = {
            owner_id: 'required|integer',
            page: 'integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        let page = parseInt(request.input('page'), 10);
        page = page > 0 ? page : 1;

        const user = await auth.getUser();
        const posts = await PostsService.getPostsByOwner(request.input('owner_id'), user.id, page);

        response.json(posts);
    }

    async showArchived({request, response, auth}) {

        const rules = {
            page: 'integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        let page = parseInt(request.input('page'), 10);
        page = page > 0 ? page : 1;

        const user = await auth.getUser();
        const posts = await PostsService.getArchivedPosts(user, page);

        response.json(posts);
    }

    async create({request, response, auth}) {

        const Helpers = use('Helpers');
        const uuidv4 = require('uuid/v4');

        const postImage = request.file('media', {
            types: ['image', 'video'],
            size: '10mb',
            extnames: ['jpg', 'jpeg', 'mp4']
        });

        const rules = {
            caption: 'string|max:1000'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const name = uuidv4() + '.' + postImage.extname;
        const path = Helpers.publicPath('uploads') + '/' + user.id;

        await postImage.move(path, {
            name, overwrite: true
        });

        if (!postImage.moved())
            return postImage.error();

        const postData = request.input('caption');
        let post = await Post.create({
            ...postData,
            owner_id: user.id,
            src: '/uploads/' + user.id + '/' + name
        });

        post.owner = user.username;
        post.isLiked = false;
        post.likes_count = 0;
        post.comments_count = 0;

        this.contentDistribution(post.id, user.id);

        response.json({
            message: 'Post successfully created',
            post
        });
    }

    async contentDistribution(post_id, id) {
        let friends = await Friendship
            .query()
            .where('user_id', id)
            .pluck('subscriber_id');
        friends.push(id);

        const bulkFeed = friends.map(id => {
            return {
                receiver_id: id,
                post_id
            }
        });

        await Feed
            .query()
            .from('feeds')
            .insert(bulkFeed);
    }

    async update({request, response, auth}) {

        const rules = {
            id: 'required|integer',
            caption: 'string|max:1000'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const post = await Post.find(request.input('id'));

        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        const user = await auth.getUser();
        if (!user.isOwner(post))
            return response.status(403).json({
                message: 'Forbidden. Unable to update'
            });

        post.merge(request.all());
        post.save();

        response.json({message: 'Post updated successfully'});
    }

    async delete({request, response, auth}) {

        const rules = {
            id: 'required|integer',
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const post = await Post.find(request.input('id'));

        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        const user = await auth.getUser();
        if (!user.isOwner(post))
            return response.status(403).json({
                message: 'Forbidden. Unable to delete'
            });

        await post.delete();

        response.json({message: 'Post deleted successfully'});
    }

    async addToArchive({request, response, auth}) {
        const rules = {
            post_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const post = await Post
            .query()
            .where('id', request.input('post_id'))
            .where('owner_id', user.id)
            .first();

        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        if (post.archive)
            return response.status(400).json({
                message: 'Post already archived'
            });

        post.archive = true;
        await post.save();

        response.json({
            message: 'Successfully added to the archive'
        });
    }

    async deleteFromArchive({request, response, auth}) {
        const rules = {
            post_id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const post = await Post
            .query()
            .where('id', request.input('post_id'))
            .where('owner_id', user.id)
            .first();

        if (!post)
            return response.status(400).json({
                message: 'Post does not exists'
            });

        if (!post.archive)
            return response.status(400).json({
                message: 'Post already available'
            });

        post.archive = false;
        await post.save();

        response.json({
            message: 'Successfully unarchived'
        });
    }
}

module.exports = PostController;
