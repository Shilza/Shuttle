const SUITE_NAME = 'FriendshipService searchFollows';
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test(`${SUITE_NAME} get follows list by name`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const page = 1;
  const username = user.username;

  await FriendshipsService.create(user.id, user2.id);
  const follows = await FriendshipsService.searchFollows(user2.id, page, username);

  assert.hasAllKeys(follows, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(follows.data.rows);
  assert.equal(follows.data.rows[0].id, user.id);
});

test(`${SUITE_NAME} 0 results`, async ({assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const page = 1;
  const username = user.username;
  const follows = await FriendshipsService.searchFollows(user2.id, page, username);

  assert.hasAllKeys(follows, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(follows.data.rows);
  assert.lengthOf(follows.data.rows, 0);
});
