'use strict';

const Mail = use('Mail');
const Env = use('Env');

const Registration = exports = module.exports = {};
const appName = Env.get('APP_NAME');

Registration.method = user => {
    Mail.send('emails.welcome', {
        username: user.username,
        appName
    }, message => {
        message
            .to(user.email)
            .from(Env.get('MAIL_USERNAME'), appName)
            .subject('Welcome to ' + appName)
    });
};