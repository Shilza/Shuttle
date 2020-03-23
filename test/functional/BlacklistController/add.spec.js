const SUITE_NAME = "Blacklist add";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const Blacklist = use('App/Models/Blacklist');
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const UsersService = use('UsersService');
const SubscriptionRequestsService = use('SubscriptionRequestsService');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_BLACKLIST = "api/v1/users/blacklist";
const ENDPOINT = API_BLACKLIST;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  });
});

test(`${SUITE_NAME} error Unable to blacklist itself`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({id: user.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Unable to blacklist itself"
  })
});

test(`${SUITE_NAME} error User does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  })
});

test(`${SUITE_NAME} error User already blacklisted`, async ({client, assert}) => {

  const user = await User.find(1);

  await Blacklist.create({
    user_id: user.id,
    blacklisted_id: 2
  });

  const response = await client
    .post(ENDPOINT)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User already blacklisted"
  })
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  await Friendship.create({user_id: 1, subscriber_id: 2});

  await SubscriptionRequest
    .create({
      receiver_id: user.id,
      subscriber_id: 2
    });

  const response = await client
    .post(ENDPOINT)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  const isFollower = await FriendshipsService.isFollower(user.id, 2);
  const isSubRequestSent = await SubscriptionRequestsService.isRequestExists(user.id, 2);

  response.assertStatus(200);
  assert.equal(response.body.message, "Added to blacklist successfully");
  assert.isFalse(isFollower);
  assert.isFalse(isSubRequestSent);
});
