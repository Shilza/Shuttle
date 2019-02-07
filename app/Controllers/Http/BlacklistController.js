'use strict';

const {validate} = use('CValidator');
const Blacklist = use('App/Models/Blacklist');
const User = use('App/Models/User');

class BlacklistController {

    async show({ request, response, auth }) {

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

        let blacklisted = await Blacklist
            .query()
            .select('blacklisted_id')
            .where('user_id', user.id)
            .with('blacklisted')
            .orderBy('updated_at', 'desc')
            .paginate(page, 40);

        response.json(blacklisted);
    }

    async add({ request, response, auth }) {
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

        if(parseInt(request.input('id')) === user.id)
            return response.status(400).json({
                message: 'Unable to blacklist itself'
            });

        if(!blacklisted)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const isBlacklisted = await Blacklist
            .query()
            .where('user_id', user.id)
            .where('blacklisted_id', blacklisted.id)
            .first();

        if(isBlacklisted)
            return response.status(400).json({
                message: 'User already blacklisted'
            });

        await Blacklist.create({
            user_id: user.id,
            blacklisted_id: request.input('id')
        });

        response.json({
            message: 'Added to blacklist successful'
        });
    }

    async delete({ request, response, auth }) {
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

        if(parseInt(request.input('id')) === user.id)
            return response.status(400).json({
                message: 'Unable to remove yourself from the blacklist'
            });

        if (!blacklisted)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const blacklist = await Blacklist
            .query()
            .where('user_id', user.id)
            .where('blacklisted_id', blacklisted.id)
            .first();

        if (!blacklist)
            return response.status(400).json({
                message: 'User is not blacklisted'
            });

        await blacklist.delete();

        response.json({
            message: 'Deleted successfully from blacklist'
        });
    }
}

module.exports = BlacklistController;
