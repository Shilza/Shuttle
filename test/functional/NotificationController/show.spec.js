const SUITE_NAME = "Notification show";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Action = use('App/Models/Action');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_NOTIFICATIONS = "api/v1/notifications";
const ENDPOINT = API_NOTIFICATIONS;

test(`${SUITE_NAME} show error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  await Action.create({
    initiator_id: user2.id,
    receiver_id: user.id,
    type: 2,
    entity_id: 1
  });

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[0].read, 1);
  assert.equal(response.body.data[0].username, user2.username);
  assert.equal(response.body.data[0].info, "comment your post");
});
