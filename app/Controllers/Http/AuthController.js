'use strict';

const User = use('App/Models/User');
const NotificationsService = use('NotificationsService');

class AuthController {

    /**
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async register({request, response}) {
        const Event = use('Event');
        const {validate} = use('CValidator');

        const rules = {
            email: 'required|email|unique:users,email',
            username: 'required|min:2|max:12|regex:^[a-z0-9]+$|unique:users,username',
            password: 'required|min:8|max:32|confirmed'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        let userData = request.only(['username', 'email', 'password']);

        const user = await User.create(userData);
        Event.fire('user::register', user);

        response.json({message: 'Registered successfully. Please, log in'});
    }

    /**
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<*>}
     */
    async login({request, response, auth}) {
        const {validate} = use('CValidator');
        const Hash = use('Hash');
        const Config = use('Config');
        const moment = require('moment');

        const rules = {
            username: 'required|min:2|max:16',
            password: 'required|min:8|max:32'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await User
            .query()
            .where('username', request.input('username'))
            .first();

        if (!user)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const isPassword = await Hash.verify(request.input('password'), user.password);

        if (!isPassword)
            return response.status(400)
                .json({message: 'Incorrect login or password'});

        const jwt = await auth
            .withRefreshToken()
            .generate(user);

        jwt.expiresIn = Number(moment().format('X')) + Config.get('app.jwt.ttl');
        jwt.user = user;
        jwt.user.notificationsCount = await NotificationsService.getNotificationsCount(user.id);

        response.json(jwt);
    }

    /**
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<*>}
     */
    async me({request, response, auth}) {
        try {
            const user = await auth.getUser();
            user.notificationsCount = await NotificationsService.getNotificationsCount(user.id);
            return response.json({user});
        } catch (error) {
            response.status(400).json('You are not logged in');
        }

        response.json(user);
    }

    /**
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<*>}
     */
    async refresh({request, response, auth}) {
        const Config = use('Config');
        const moment = require('moment');
        const {validate} = use('CValidator');

        const rules = {
            refreshToken: 'required|string',
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const jwt = await auth
            .newRefreshToken()
            .generateForRefreshToken(request.input('refreshToken'));
        jwt.expiresIn = Number(moment().format('X')) + Config.get('app.jwt.ttl');

        response.json(jwt);
    }

    /**
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<*>}
     */
    async logout({request, response, auth}) {
        const {validate} = use('CValidator');

        const rules = {
            refreshToken: 'required|string',
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        await auth
            .authenticator('jwt')
            .revokeTokens(request.input('refreshToken'), true);

        return response.json({message: 'Logout successfully'});
    }

    /**
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<void>}
     */
    async revokeAll({request, response, auth}) {
        await auth
            .authenticator('jwt')
            .revokeTokens();

        response.json({message: 'All tokens revoked successfully'});
    }
}

module.exports = AuthController;




