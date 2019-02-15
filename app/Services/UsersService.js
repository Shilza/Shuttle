const User = use('App/Models/User');
const Blacklist = use('App/Models/Blacklist');
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const FriendshipsService = use('FriendshipsService');

class UsersService {

    async canSee(user, requesterId) {
        if (user.private && (requesterId !== user.id))
            return await FriendshipsService.isFollower(user.id, requesterId);

        return true;
    }

    async getFriendshipState(userId, meId) {
        if(await this.isSubscriptionRequest(userId, meId))
            return 1;
        if (await FriendshipsService.isFollower(userId, meId))
            return 2;
        else
            return 0;
    }

    async isSubscriptionRequest(receiverId, subId) {
        return await SubscriptionRequest
            .query()
            .select(1)
            .where('receiver_id', receiverId)
            .where('subscriber_id', subId)
            .first();
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

    async cancelSubRequest(receiverId, subId) {
        await SubscriptionRequest
            .query()
            .where('receiver_id', receiverId)
            .where('subscriber_id', subId)
            .delete();
    }
}

module.exports = UsersService;