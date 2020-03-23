const SUITE_NAME = "Users follows search";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = `${API_USERS}/followsSearch`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on user_id`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on user_id"
  });
});

test(`${SUITE_NAME} error Username is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(`${API_USERS}/followersSearch`)
    .query({user_id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username is required"
  });
});

test(`${SUITE_NAME} error User does not exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({user_id: -1, username: "test"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test(`${SUITE_NAME} error cannot see`, async ({client, assert}) => {
  const user = await User.find(1);
  const user2 = await User.find(2);

  user2.private = 1;
  await user2.save();

  const response = await client
    .get(ENDPOINT)
    .query({user_id: 2, username: "test"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.isTrue(response.body.private);
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  await Friendship.create({user_id: 1, subscriber_id: 2});

  const response = await client
    .get(ENDPOINT)
    .query({user_id: 2, username: "test"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.equal(response.body.data[0].id, user.id);
});
