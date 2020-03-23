const SUITE_NAME = "SubscriptionRequest accept";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const User = use('App/Models/User');
const FriendshipsService = use('FriendshipsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_SUBS = "api/v1/subRequests";
const ENDPOINT = API_SUBS;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on user_id`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on user_id"
  });
});


test(`${SUITE_NAME} error Subscription request does not exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({user_id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Subscription request does not exists"
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  await SubscriptionRequest
    .create({
      receiver_id: user.id,
      subscriber_id: 2
    });

  const response = await client
    .post(ENDPOINT)
    .query({user_id: 2})
    .loginVia(user, 'jwt')
    .end();

  const isFollower = await FriendshipsService.isFollower(user.id, 2);
  const isReqExists = await SubscriptionRequestsService.isRequestExists(user.id, 2);

  response.assertStatus(200);
  assert.equal(response.body.message, "Subscription request accepted");
  assert.isTrue(isFollower);
  assert.isFalse(isReqExists);
});
