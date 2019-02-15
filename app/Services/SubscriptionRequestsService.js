const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const User = use('App/Models/User');

class SubscriptionRequestsService{
    async isRequestExists(receiverId, subscriberId) {
        await SubscriptionRequest
            .query()
            .select(1)
            .where('receiver_id', receiverId)
            .where('subscriber_id', subscriberId)
            .first();
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
}

module.exports = SubscriptionRequestsService;