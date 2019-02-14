const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const Blacklist = use('App/Models/Blacklist');

class UsersService {

    async canSee(user, requesterId) {
        if(user.private && (requesterId !== user.id ))
            return await this.isFollower(user.id, requesterId);

        return true;
    }

    async isBlacklisted(blacklistedId, userId) {
        const isBlacklisted = await Blacklist
            .query()
            .select(1)
            .where('user_id', userId)
            .where('blacklisted_id', blacklistedId)
            .fetch();

        return !!isBlacklisted.rows.length;
    }

    async isFollower(userId, subscriberId) {
        const isFollower = await Friendship
            .query()
            .select(1)
            .where('user_id', userId)
            .where('subscriber_id', subscriberId)
            .fetch();

        return !!isFollower.rows.length;
    }

    async getFollowers(user) {
        let followersIds = await user.followers().fetch();
        followersIds = followersIds.toJSON().map(item => item.subscriber_id);

        return await User
            .query()
            .whereIn('id', followersIds)
            .fetch();
    }

    async getFollows(user) {
        let followsIds = await user.follows().fetch();
        followsIds = followsIds.toJSON().map(item => item.user_id);

        return await User
            .query()
            .whereIn('id', followsIds)
            .fetch();
    }
}

module.exports = UsersService;