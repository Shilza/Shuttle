'use strict';
const {validate} = use('CValidator');
const PassReset = use('App/Models/PassReset');
const User = use('App/Models/User');
const Event = use('Event');

class PasswordController {

    /**
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async reset({request, response}) {

        const rules = {
            email: 'required|email'
        };

        const email = request.input('email');
        const validation = await validate(email, rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const resetsCount = await PassReset
            .query()
            .where('email', email)
            .getCount();

        if (resetsCount > 2) {
            return response.json({
                message: 'Password recovery limit exceeded, please check your email or wait until the end of the limit'
            });
        }

        const user = await User
            .query()
            .where('email', email)
            .first();

        if (!user) {
            return response.status(400).json({
                message: 'User with this nickname not found'
            });
        }

        const passReset = await PassReset.create({
            email, token: this.randomString(60)
        });

        Event.fire('user::passReset', user, passReset.token);

        response.json({
            message: 'We have e-mailed your password reset link!'
        });
    }

    /**
     * @param length
     * @returns {string | *}
     */
    randomString(length) {
        let random13chars = function () {
            return Math.random().toString(16).substring(2, 15)
        };
        let loops = Math.ceil(length / 13);
        return new Array(loops).fill(random13chars).reduce((string, func) => {
            return string + func()
        }, '').substring(0, length)
    }

    /**
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async update({request, response}) {
        const moment = require('moment');

        const rules = {
            email: 'required|string|email',
            password: 'required|string|min:6|max:32|confirmed',
            token: 'required|string'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.status(400).json({
                message: validation.messages()[0].message
            });
        }

        const {
            email, password, token
        } = request.only(['email', 'password', 'token']);

        const passReset = await PassReset
            .query()
            .where('email', email)
            .where('token', token)
            .first();

        if (!passReset)
            return response.status(400).json({
                message: 'Invalid reset token'
            });

        const isTokenInvalid = moment()
            .isAfter(moment(passReset.created_at).add(12, 'hours'));

        if (isTokenInvalid)
            return response.status(400).json({
                message: 'Your token is expires. Please, try again'
            });

        let user = await User.findBy('email', email);
        user.password = password;
        user.save();

        passReset.delete();

        Event.fire('user::passUpdate', user);
        response.json({message: 'Reset successfully! Please, login'});
    }
}

module.exports = PasswordController;
