const SUITE_NAME = "Users make private";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = `${API_USERS}/privacy`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error already is private`, async ({client, assert}) => {
  const user = await User.find(1);

  user.private = 1;
  await user.save();

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Account already is private"
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Account is now private");
});
