'use strict';

class CValidator {

    /**
     * @returns {{"email.required": string, "email.unique": string, "email.email": string, "username.required": string, "username.min": string, "username.max": string, "username.unique": string, "password.required": string, "password.min": string, "password.max": string, "password.confirmed": string, "refreshToken.required": string, "token.required": string}}
     */
    static getCMessages() {
        return {
            'email.required': 'Email is required',
            'email.unique': 'Email already exists',
            'email.email': 'Wrong email',

            'username.required': 'Username is required',
            'username.min': 'Username must be at least 2 characters',
            'username.max': 'Username must be less than 16 characters',
            'username.unique': 'Username already exists',

            'password.required': 'Password is required',
            'password.min': 'Password must be at least 8 characters',
            'password.max': 'Password must be less than 32 characters',
            'password.confirmed': 'Password must be confirmed',

            'refreshToken.required': 'Refresh token is required',

            'token.required': 'Update token is required'
        };
    };

    /**
     * @param data
     * @param rules
     * @param messages
     * @returns {*}
     */
    validate(data, rules, messages = CValidator.getCMessages()) {
        const {validate} = use('Validator');
        return validate(data, rules, messages);
    }
}

module.exports = CValidator;