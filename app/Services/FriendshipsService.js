const Friendship = use('App/Models/Friendship');

class FriendshipsService {
    async isFollower(userId, subscriberId) {
        return await Friendship
            .query()
            .select(1)
            .where('user_id', userId)
            .where('subscriber_id', subscriberId)
            .first();
    }

    async create(user_id, subscriber_id) {
        await Friendship.create({user_id, subscriber_id});
    }

    async delete(userId, subId) {
        await Friendship
            .query()
            .where('user_id', userId)
            .where('subscriber_id', subId)
            .delete();
    }

}

module.exports = FriendshipsService;