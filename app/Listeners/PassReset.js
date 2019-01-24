'use strict';

const PassReset = exports = module.exports = {};
const Mail = use('Mail');
const Env = use('Env');

PassReset.method = (user, token) => {
    user.url = getResetUrl(user.email, token);

    Mail.send('emails.passReset', user.toJSON(), message => {
        message
            .to(user.email)
            .from(Env.get('MAIL_USERNAME'), Env.get('APP_NAME'))
            .subject('Reset password')
    });
};

/**
 * @param email
 * @param token
 * @returns {string}
 */
const getResetUrl = (email, token) => {
    const newEmail =  email.replace('@', '29gnmLTv686QsnV');
    return Env.get('APP_URL') + '/password-update/' + token + '/' + newEmail;
};