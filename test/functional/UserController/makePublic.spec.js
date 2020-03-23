const SUITE_NAME = "Users make public";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = `${API_USERS}/privacy`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .delete(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test('users make public error already is public', async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Account already is public"
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  user.private = 1;
  await user.save();

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Account is now public");
});
