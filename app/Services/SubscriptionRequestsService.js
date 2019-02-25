const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const User = use('App/Models/User');
const FriendshipsService = use('FriendshipsService');
const Friendship = use('App/Models/Friendship');

class SubscriptionRequestsService {

    async getRequests(userId, page) {
        const requests = await this._getRequests(userId, page);

        const subsIds = requests.data.map(item => item.subscriber_id);
        const subs = await User
            .query()
            .select(['id', 'username', 'avatar'])
            .whereIn('id', subsIds)
            .fetch();

        requests.data = requests.data.map(item => {
            const user = subs.rows.find(user => {
                if (user.id === item.subscriber_id)
                    return true;
            });

            item.avatar = user.avatar;
            item.username = user.username;
            item.id = user.id;

            delete item.receiver_id;
            delete item.subscriber_id;

            return item;
        });

        return requests;
    }

    async isRequestExists(receiverId, subscriberId) {
        return !!(await SubscriptionRequest
            .query()
            .select(1)
            .where('receiver_id', receiverId)
            .where('subscriber_id', subscriberId)
            .first());
    }

    async getSubRequestsCount(receiverId) {
        return (await SubscriptionRequest
            .query()
            .where('receiver_id', receiverId)
            .count())[0]['count(*)'];
    }

    async getAvatarOfLastSubscriber(receiverId) {
        const subId = (await SubscriptionRequest
            .query()
            .where('receiver_id', receiverId)
            .limit(1)
            .orderBy('created_at', 'desc')
            .pluck('subscriber_id'))[0];

        return (await User
            .query()
            .where('id', subId)
            .pluck('avatar'))[0];
    }

    async delete(receiverId, subscriberId) {
        await SubscriptionRequest
            .query()
            .where('receiver_id', receiverId)
            .where('subscriber_id', subscriberId)
            .delete();
    }

    async allowAllRequests(userId) {
        const requests = await SubscriptionRequest
            .query()
            .where('receiver_id', userId)
            .pluck('subscriber_id');

        let friendships = [];
        requests.forEach(subscriber_id => {
            friendships.push(
                Friendship.create({user_id: userId, subscriber_id: subscriber_id})
            );
        });

        await Promise.all(friendships);
        await await SubscriptionRequest
            .query()
            .where('receiver_id', userId)
            .delete();
    }

    async _getRequests(userId, page) {
        return (await SubscriptionRequest
            .query()
            .where('receiver_id', userId)
            .paginate(page, 20)).toJSON();
    }
}

module.exports = SubscriptionRequestsService;