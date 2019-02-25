'use strict';

const {validate} = use('CValidator');
const Blacklist = use('App/Models/Blacklist');
const User = use('App/Models/User');
const UsersService = use('UsersService');
const SubscriptionRequestsService = use('SubscriptionRequestsService');
const FriendshipsService = use('FriendshipsService');

class BlacklistController {

    async show({request, response, auth}) {

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

        let blacklisted = (await Blacklist
            .query()
            .select('blacklisted_id')
            .where('user_id', user.id)
            .with('blacklisted')
            .orderBy('updated_at', 'desc')
            .paginate(page, 40)).toJSON();

        blacklisted.data = blacklisted.data.map(item => {
            delete item.blacklisted_id;
            item = item.blacklisted[0];

            return item;
        });

        response.json(blacklisted);
    }

    async add({request, response, auth}) {
        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();
        const blacklisted = await User.find(request.input('id'));

        if (parseInt(request.input('id')) === user.id)
            return response.status(400).json({
                message: 'Unable to blacklist itself'
            });

        if (!blacklisted)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const isBlacklisted = await UsersService.isBlacklisted(blacklisted.id, user.id);

        if (isBlacklisted)
            return response.status(400).json({
                message: 'User already blacklisted'
            });

        const blacklistedId = request.input('id');
        await Blacklist.create({
            user_id: user.id,
            blacklisted_id: blacklistedId
        });

        const isFollower = await FriendshipsService.isFollower(user.id, blacklistedId);
        if(isFollower)
            await FriendshipsService.delete(user.id, blacklistedId);

        const isReqExists = await SubscriptionRequestsService.isRequestExists(user.id, blacklistedId);
        if (isReqExists)
            await SubscriptionRequestsService.delete(user.id, blacklistedId);

        response.json({
            message: 'Added to blacklist successful'
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

        const user = await auth.getUser();
        const blacklisted = await User.find(request.input('id'));

        if (parseInt(request.input('id')) === user.id)
            return response.status(400).json({
                message: 'Unable to remove yourself from the blacklist'
            });

        if (!blacklisted)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const isBlacklisted = await UsersService.isBlacklisted(blacklisted.id, user.id);

        if (!isBlacklisted)
            return response.status(400).json({
                message: 'User is not blacklisted'
            });

        await Blacklist
            .query()
            .where('user_id', user.id)
            .where('blacklisted_id', blacklisted.id)
            .delete();

        response.json({
            message: 'Deleted successfully from blacklist'
        });
    }
}

module.exports = BlacklistController;
