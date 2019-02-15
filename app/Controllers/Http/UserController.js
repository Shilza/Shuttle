'use strict';

const User = use('App/Models/User');
const UsersService = use('UsersService');

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
            .first();

        if (user)
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
        user.friendshipState = await UsersService.getFriendshipState(user.id, me.id);
        user.canSee = await UsersService.canSee(user, me.id);
        user.blacklisted = await UsersService.isBlacklisted(user.id, me.id);

        response.json(user);
    }

    async update({request, response, auth}) {
        const {validate} = use('CValidator');

        //TODO: add regex validation
        const rules = {
            username: 'string|min:2|max:16',
            bio: 'string|max:100',
            site: 'string|max:50'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const availableFields = [
            'username', 'bio', 'site'
        ];

        let dataForUpdate = {};
        Object.entries(request.all()).forEach(entry => {
            if (availableFields.includes(entry[0]) && user[entry[0]] !== entry[1]){
                dataForUpdate[entry[0]] = entry[1];
            }
        });

        if(!Object.keys(dataForUpdate).length)
            return response.status(400).json({
                message: 'Nothing to update'
            });

        if(dataForUpdate.hasOwnProperty('username')) {
            const username = await User
                .query()
                .select(1)
                .where('username', dataForUpdate.username)
                .first();

            if (username)
                return response.status(400).json({
                    message: 'Username already exists'
                });
        }

        let isUpdated = await User
            .query()
            .where('id', user.id)
            .update(dataForUpdate);

        if(isUpdated) {
            const updatedUser = await User.query()
                .where('id', user.id)
                .withCount('posts', (builder) => {
                    builder.where('archive', false)
                })
                .withCount('followers')
                .withCount('follows')
                .first();

            return response.json({
                message: 'Updated successfully',
                user: updatedUser
            });
        }

        response.status(400).json({
            message: 'Something went wrong'
        });
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

    async followers({request, response, auth}) {
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
            return response.status(400).json({message: 'User does not exists'});

        const requester = await auth.getUser();

        const canSee = await UsersService.canSee(user, requester.id);
        if(canSee) {
            const followers = await UsersService.getFollowers(user);
            return response.json({ followers });
        }
        else
            return response.json({ private: true });
    }

    async follows({request, response, auth}) {
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

        const requester = await auth.getUser();

        const canSee = await UsersService.canSee(user, requester.id);
        if(canSee) {
            const follows = await UsersService.getFollows(user);
            return response.json({ follows });
        }
        else
            return response.json({ private: true });
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
