const SUITE_NAME = 'Friendship follow';
const {test, trait} = use('Test/Suite')('Friendship follow');
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const Blacklist = use('App/Models/Blacklist');
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_FRIENDSHIP = "api/v1/friendships";

test(`${SUITE_NAME} error 401`, async ({client}) => {

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on id`, async ({client}) => {
  const user = await User.find(1);

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  });
});

test(`${SUITE_NAME} error User does not exists`, async ({client}) => {
  const user = await User.find(1);

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test(`${SUITE_NAME} error You are is blacklisted`, async ({client}) => {
  const user = await User.find(1);

  await Blacklist.create({
    user_id: 2,
    blacklisted_id: user.id
  });

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "You are is blacklisted"
  });
});

test(`${SUITE_NAME} error Already follow`, async ({client}) => {
  const user = await User.find(1);

  await Friendship.create({user_id: 2, subscriber_id: 1});

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Already follow"
  });
});

test(`${SUITE_NAME} Subscription request successfully sent`, async ({client}) => {
  const user = await User.find(1);
  const user2 = await User.find(2);

  user2.private = 1;
  await user2.save();

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  response.assertError({
    message: "Subscription request successfully sent"
  });
});

test(`${SUITE_NAME} error Subscription request already sent`, async ({client}) => {
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
    .post(`${API_FRIENDSHIP}/follow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Subscription request already sent"
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(`${API_FRIENDSHIP}/follow`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  const isFollower = await FriendshipsService.isFollower(2, user.id);

  response.assertStatus(200);
  assert.equal(response.body.message, "Followed successfully");
  assert.isTrue(isFollower);
});
