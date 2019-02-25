const User = use('App/Models/User');
const Blacklist = use('App/Models/Blacklist');
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const FriendshipsService = use('FriendshipsService');

class UsersService {

    async canSee(user, requesterId) {
        const requesterBlacklisted = await this.isBlacklisted(requesterId, user.id);
        if(requesterBlacklisted)
            return false;
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
        return !!(await Blacklist
            .query()
            .select(1)
            .where('user_id', userId)
            .where('blacklisted_id', blacklistedId)
            .first());
    }

    async getFollowers(user, page) {
        let followersIds = await user.followers().fetch();
        followersIds = followersIds.toJSON().map(item => item.subscriber_id);

        return await User
            .query()
            .select(['avatar', 'id', 'username'])
            .whereIn('id', followersIds)
            .paginate(page, 18);
    }

    async getFollows(user, page) {
        let followsIds = await user.follows().fetch();
        followsIds = followsIds.toJSON().map(item => item.user_id);

        return await User
            .query()
            .whereIn('id', followsIds)
            .paginate(page, 30);
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