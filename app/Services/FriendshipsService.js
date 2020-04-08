const Friendship = use('App/Models/Friendship');
const User = use('App/Models/User');

class FriendshipsService {
  async isFollower(userId, subscriberId) {
    return !!(await Friendship
      .query()
      .select(1)
      .where('user_id', userId)
      .where('subscriber_id', subscriberId)
      .first());
  }

  async searchFollowers(userId, page, username) {
    let followers = (await Friendship
      .query()
      .select('subscriber_id')
      .where('user_id', userId)
      .paginate(page, 18)).toJSON();

    followers.data = await User
      .query()
      .whereIn('id', followers.data.map(item => item.subscriber_id))
      .where('username', 'like', username + '%')
      .select(['id', 'username', 'avatar'])
      .fetch();

    return followers;
  }

  async searchFollows(userId, page, username) {
    let followers = (await Friendship
      .query()
      .select('user_id')
      .where('subscriber_id', userId)
      .paginate(page, 18)).toJSON();

    followers.data = await User
      .query()
      .whereIn('id', followers.data.map(item => item.user_id))
      .where('username', 'like', username + '%')
      .select(['id', 'username', 'avatar'])
      .fetch();

    return followers;
  }

  async create(user_id, subscriber_id) {
    return await Friendship.create({user_id, subscriber_id});
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
