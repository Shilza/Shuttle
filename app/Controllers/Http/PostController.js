'use strict';

const Post = use('App/Models/Post');
const User = use('App/Models/User');
const Database = use('Database');
const {validate} = use('CValidator');

class PostController {

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

        const page = parseInt(request.input('page'), 10);
        let posts = await Post
            .query()
            .where('owner_id', request.input('owner_id'))
            .withCount('comments')
            .withCount('likes')
            .orderBy('id', 'desc')
            .paginate(page, 12);

        const user = await auth.getUser();
        let likes;
        if (user) {
            // get requester likes on post
            likes = await Database
                .from('likes')
                .where('type', 1)
                .where('owner_id', user.id)
                .whereIn('entity_id', posts.rows.map(e => e.id));

            likes = JSON.parse(JSON.stringify(likes));
        }

        const owner = await User.find(request.input('owner_id'));
        posts.rows = posts.rows.map(post => {
            post.owner = owner.username;
            // is comment liked by requester
            if (likes) {
                post.isLiked = !!likes.find(like => {
                    if (like.entity_id === post.id)
                        return true;
                });
            }

            return post;
        });

        response.json(posts);
    }

    async create({request, response, auth}) {

        const Helpers = use('Helpers');
        const uuidv1 = require('uuid/v1');

        const profilePic = request.file('media', {
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
        const postData = request.only(['caption']);
        const name = uuidv1() + '.' + profilePic.extname;
        const path = Helpers.publicPath('uploads') + '/' + user.id;

        await profilePic.move(path, {
            name, overwrite: true
        });

        if (!profilePic.moved())
            return profilePic.error();

        let post = await Post.create({
            ...postData,
            owner_id: user.id,
            src: 'uploads/' + user.id + '/' + name
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
        let friends = await Database
            .from('friendships')
            .where('user_id', id)
            .pluck('subscriber_id');
        friends.push(id);

        const bulkFeed = friends.map(id => {
            return {
                receiver_id: id,
                post_id
            }
        });

        await Database
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
}

module.exports = PostController;
