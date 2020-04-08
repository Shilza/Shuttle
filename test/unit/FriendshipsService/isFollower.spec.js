const SUITE_NAME = 'FriendshipService isFollower';
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test(`${SUITE_NAME} is not follower`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const isFollower = await FriendshipsService.isFollower(user.id, user2.id);

  assert.isFalse(isFollower);
});

test(`${SUITE_NAME} is follower`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  await FriendshipsService.create(user2.id, user.id);
  const isFollower = await FriendshipsService.isFollower(user.id, user2.id);

  assert.isFalse(isFollower);
});
