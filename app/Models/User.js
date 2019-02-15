'use strict';

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {

    static boot() {
        super.boot();

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        });
    }


    /**
     * @returns {string[]}
     */
    static get hidden() {
        return ['email', 'password', 'created_at', 'updated_at']
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token');
    }

    posts () {
        return this.hasMany('App/Models/Post', 'id', 'owner_id');
    }

    followers () {
        return this.hasMany('App/Models/Friendship', 'id', 'user_id');
    }

    follows () {
        return this.hasMany('App/Models/Friendship', 'id', 'subscriber_id');
    }

    isOwner(entity) {
        return entity.owner_id === this.id;
    }

    subscriprionRequests() {
        return this.hasMany('App/Models/SubscriptionRequest', 'id', 'receiver_id');
    }
}

module.exports = User;
