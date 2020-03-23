const SUITE_NAME = "Users isNameUnique";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = `${API_USERS}/unique`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});


test(`${SUITE_NAME} error username is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username is required"
  });
});

test(`${SUITE_NAME} error Username already exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({username: "test1"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.deepEqual(response.body, {
    unique: false,
    message: 'Username already exists'
  });
});

test(`${SUITE_NAME} successfull`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({username: "randomtest"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.deepEqual(response.body, {
    unique: true
  });
});
