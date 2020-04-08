const SUITE_NAME = 'Friendship delete follower';
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_FRIENDSHIP = "api/v1/friendships";

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .delete(`${API_FRIENDSHIP}/follower`)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on id`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .delete(`${API_FRIENDSHIP}/follower`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  });
});

test(`${SUITE_NAME} error User does not exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .delete(`${API_FRIENDSHIP}/follower`)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test(`${SUITE_NAME} error User is not follow you`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .delete(`${API_FRIENDSHIP}/follower`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User is not follow you"
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  await Friendship.create({user_id: user.id, subscriber_id: 2});

  const response = await client
    .delete(`${API_FRIENDSHIP}/follower`)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  const isFollower = await FriendshipsService.isFollower(2, user.id);

  response.assertStatus(200);
  assert.equal(response.body.message, "Follower removed successfully");
  assert.isFalse(isFollower);
});
