'use strict';

const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');

class UserController {

    async isNameUnique({request, response, auth}) {
        const {validate} = use('CValidator');

        const rules = {
            username: 'required|min:2|max:16'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const currentUser = await auth.getUser();
        if (currentUser.username === request.input('username'))
            return response.json({
                unique: true
            });

        const user = await User
            .query()
            .select(1)
            .where('username', request.input('username'))
            .fetch();

        if (user.rows.length)
            return response.json({
                unique: false,
                message: 'Username already exists'
            });

        response.json({
            unique: true
        });
    }

    async show({request, response, auth}) {
        const {validate} = use('CValidator');

        const rules = {
            username: 'required|min:2|max:16'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        let user = await User.query()
            .where('username', request.input('username'))
            .withCount('posts', (builder) => {
                builder.where('archive', false)
            })
            .withCount('followers')
            .withCount('follows')
            .first();

        if (!user)
            return response.status(404).json({
                message: 'User does not exists'
            });

        const me = await auth.getUser();
        const isFollows = await Friendship
            .query()
            .where('user_id', user.id)
            .where('subscriber_id', me.id)
            .first();

        user.isFollows = !!isFollows;

        response.json(user);
    }

    async updateAvatar({request, response, auth}) {

        const user = await auth.getUser();

        const Helpers = use('Helpers');
        const uuidv1 = require('uuid/v1');

        const profilePic = request.file('avatar', {
            types: ['image'],
            size: '10mb',
            extnames: ['jpg', 'jpeg']
        });

        const name = uuidv1() + '.' + profilePic.extname;
        const path = Helpers.publicPath('uploads') + '/' + user.id;

        await profilePic.move(path, {
            name, overwrite: true
        });

        if (!profilePic.moved())
            return profilePic.error();

        user.avatar = '/uploads/' + user.id + '/' + name;
        user.save();

        response.json({
            message: 'Avatar successfully updated',
            avatar: user.avatar
        });
    }

    async deleteAvatar({request, response, auth}) {
        const user = await auth.getUser();

        user.avatar = null;
        user.save();

        response.json({
            message: 'Avatar successfully deleted',
        });
    }

    async followers({request, response}) {
        const {validate} = use('CValidator');

        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await User.find(request.input('id'));
        if (!user)
            response.status(400).json({message: 'User does not exists'});

        let followersIds = await user.followers().fetch();
        followersIds = followersIds.toJSON().map(item => item.subscriber_id);

        const followers = await User
            .query()
            .whereIn('id', followersIds)
            .fetch();

        response.json({followers});
    }

    async follows({request, response}) {
        const {validate} = use('CValidator');

        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await User.find(request.input('id'));
        if (!user)
            response.status(400).json({message: 'User does not exists'});

        let followsIds = await user.follows().fetch();
        followsIds = followsIds.toJSON().map(item => item.user_id);

        const follows = await User
            .query()
            .whereIn('id', followsIds)
            .fetch();

        response.json({follows});
    }

    async makePrivate({request, response, auth}) {

        const user = await auth.getUser();

        if (user.private)
            return response.status(400).json({
                message: 'Account already is private'
            });

        user.private = true;
        await user.save();

        response.json({
            message: 'Account is now private'
        });
    }

    async makePublic({request, response, auth}) {
        const user = await auth.getUser();

        if (!user.private)
            return response.status(400).json({
                message: 'Account already is public'
            });

        user.private = false;
        await user.save();

        response.json({
            message: 'Account is now public'
        });
    }
}

module.exports = UserController;
