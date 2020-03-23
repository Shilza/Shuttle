const SUITE_NAME = "Auth revokeAll";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_AUTH = "api/v1/auth";
const ENDPOINT = `${API_AUTH}/revokeAll`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});


test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  await client
    .post(ENDPOINT)
    .query({username: "test", password: "testtest"})
    .end();

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "All tokens revoked successfully");
});
