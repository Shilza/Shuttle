const SUITE_NAME = "Auth logout";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_AUTH = "api/v1/auth";
const ENDPOINT = `${API_AUTH}/logout`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error Refresh token is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Refresh token is required"
  })
});


test(`${SUITE_NAME}successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  const loginResponse = await client
    .post(`${API_AUTH}/login`)
    .query({username: "test", password: "testtest"})
    .end();

  const response = await client
    .post(ENDPOINT)
    .query({refreshToken: loginResponse.body.refreshToken})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Logout successfully");
});
