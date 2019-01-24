'use strict';

const Friendship = use('App/Models/Friendship');
const User = use('App/Models/User');
const {validate} = use('CValidator');

class FriendshipController {

    async follow({request, response, auth}) {

        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const user_id = request.input('id');
        const owner = await User.find(user_id);

        if (!owner)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const friendship = await Friendship
            .query()
            .where('user_id', user_id)
            .where('subscriber_id', user.id)
            .first();

        if(friendship)
            return response.status(400).json({
                message: 'Already follow'
            });

        await Friendship.create({
            user_id, subscriber_id: user.id
        });

        return response.json({message: 'Followed successfully'});
    }

    async unfollow({request, response, auth}) {
        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const user_id = request.input('id');
        const owner = await User.find(user_id);

        if (!owner)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const friendship = await Friendship
            .query()
            .where('user_id', user_id)
            .where('subscriber_id', user.id)
            .fetch();

        if(!friendship)
            return response.status(400).json({
                message: 'Does not follow'
            });

        await Friendship
            .query()
            .where('user_id', user_id)
            .where('subscriber_id', user.id)
            .delete();

        return response.json({message: 'Unfollowed successfully'});
    }
}

module.exports = FriendshipController;
