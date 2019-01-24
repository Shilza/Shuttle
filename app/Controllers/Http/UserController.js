'use strict';

const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');

class UserController {

    async show({ request, response, auth }) {
        const {validate} = use('CValidator');

        const rules = {
            username: 'required|min:2|max:16'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        //const user = await User.findBy('username', request.input('username'));
        let user = await User.query()
            .where('username', request.input('username'))
            .withCount('posts')
            .withCount('followers')
            .withCount('follows')
            .fetch();
        user = user.toJSON()[0];

        if(!user)
            return response.status(404).json({
                message: 'User does not exists'
            });

        if(auth){
            const me = await auth.getUser();
            const isFollows = await Friendship
                .query()
                .where('user_id', user.id)
                .where('subscriber_id', me.id)
                .fetch();

            user.isFollows = isFollows.rows.length > 0;
        }

        response.json(user);
    }

    async updateAvatar({ request, response, auth }) {

    }

    async deleteAvatar({ request, response, auth }) {

    }

    async followers({ request, response }) {
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
        if(!user)
            response.status(400).json({message: 'User does not exists'});

        let followersIds = await user.followers().fetch();
        followersIds = JSON.parse(JSON.stringify(followersIds)).map(item => item.subscriber_id);

        const followers = await User
            .query()
            .whereIn('id', followersIds)
            .fetch();

        response.json({followers});
    }

    async follows({ request, response }) {
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
        if(!user)
            response.status(400).json({message: 'User does not exists'});

        let followsIds = await user.follows().fetch();
        followsIds = JSON.parse(JSON.stringify(followsIds)).map(item => item.user_id);

        const follows = await User
            .query()
            .whereIn('id', followsIds)
            .fetch();

        response.json({follows});
    }
}

module.exports = UserController;
