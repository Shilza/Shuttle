'use strict';

const PassUpdate = exports = module.exports = {};
const Mail = use('Mail');
const Env = use('Env');

PassUpdate.method = user => {
    Mail.send('emails.passUpdate', user.toJSON(), message => {
        message
            .to(user.email)
            .from(Env.get('MAIL_USERNAME'), Env.get('APP_NAME'))
            .subject('Password update')
    });
};
