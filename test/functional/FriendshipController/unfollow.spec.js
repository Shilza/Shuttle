const {test, trait} = use('Test/Suite')('Friendship unfollow');
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const Blacklist = use('App/Models/Blacklist');
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_FRIENDSHIP = "api/v1/friendships";

test('Friendship unfollow error 401', async ({client}) => {

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .end();

  response.assertStatus(401);
});

test('Friendship unfollow error required validation failed on id', async ({client}) => {
  const user = await User.find(1);

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  });
});

test('Friendship unfollow error User does not exists', async ({client}) => {
  const user = await User.find(1);

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test('Friendship unfollow error You are is blacklisted', async ({client}) => {
  const user = await User.find(1);

  await Blacklist.create({
    user_id: 2,
    blacklisted_id: user.id
  });

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "You are is blacklisted"
  });
});


test('Friendship unfollow Subscription request successfully canceled', async ({client, assert}) => {
  const user = await User.find(1);
  const user2 = await User.find(2);

  user2.private = 1;
  await user2.save();

  await SubscriptionRequest
    .create({
      receiver_id: 2,
      subscriber_id: user.id
    });

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Subscription request successfully canceled");
});

test('Friendship unfollow You are does not follow', async ({client}) => {
  const user = await User.find(1);

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "You are does not follow"
  });
});

test('Friendship unfollow successfully', async ({client, assert}) => {
  const user = await User.find(1);

  await Friendship.create({user_id: 2, subscriber_id: user.id});

  const response = await client
    .post(`${API_FRIENDSHIP}/unfollow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  const isFollower = await FriendshipsService.isFollower(2, user.id);

  response.assertStatus(200);
  assert.equal(response.body.message, "Unfollowed successfully");
  assert.containsAllKeys(response.body, ["canSee"]);
  assert.isFalse(isFollower);
});
