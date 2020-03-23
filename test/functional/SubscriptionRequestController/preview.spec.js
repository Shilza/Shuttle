const SUITE_NAME = "SubscriptionRequest preview";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_SUBS = "api/v1/subRequests";
const ENDPOINT = `${API_SUBS}/preview`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successful (empty body)`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.deepEqual(response.body, {});
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);
  const user2 = await User.find(2);

  await SubscriptionRequest
    .create({
      receiver_id: user.id,
      subscriber_id: user2.id
    });

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.deepEqual(response.body, {
    avatar: user2.avatar,
    count: 1
  });
});
