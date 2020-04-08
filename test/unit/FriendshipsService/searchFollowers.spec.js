const SUITE_NAME = 'FriendshipService searchFollowers';
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test(`${SUITE_NAME} get followers list by name`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const page = 1;
  const username = user.username;

  await FriendshipsService.create(user2.id, user.id);
  const followers = await FriendshipsService.searchFollowers(user2.id, page, username);

  assert.hasAllKeys(followers, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(followers.data.rows);
  assert.equal(followers.data.rows[0].id, user.id);
});

test(`${SUITE_NAME} 0 results`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const page = 1;
  const username = user.username;
  const followers = await FriendshipsService.searchFollowers(user2.id, page, username);

  assert.hasAllKeys(followers, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(followers.data.rows);
  assert.lengthOf(followers.data.rows, 0);
});
