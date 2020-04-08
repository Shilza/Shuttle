const SUITE_NAME = 'FriendshipService delete';
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test(`${SUITE_NAME} successful`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  await FriendshipsService.create(user2.id, user.id);
  const friendship = await Friendship
    .query()
    .where('subscriber_id', user.id)
    .where('user_id', user2.id)
    .first();

  assert.isNotNull(friendship);

  await FriendshipsService.delete(user2.id, user.id);
  const friendshipAfterDeletion = await Friendship
    .query()
    .where('subscriber_id', user.id)
    .where('user_id', user2.id)
    .first();

  assert.isNull(friendshipAfterDeletion);
});
