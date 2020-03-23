const SUITE_NAME = "Auth me";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_AUTH = "api/v1/auth";
const ENDPOINT = `${API_AUTH}/me`;

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["user"]);
});
