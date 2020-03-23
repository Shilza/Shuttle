const SUITE_NAME = "Users delete avatar";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = `${API_USERS}/avatar`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .delete(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  user.avatar = "avatar src";
  await user.save();

  const userAfterAvatarSaving = await User.find(1);
  assert.isString(userAfterAvatarSaving.avatar);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  const userAfterAvatarDeletion = await User.find(1);

  response.assertStatus(200);
  assert.equal(response.body.message, "Avatar successfully deleted");
  assert.isNull(userAfterAvatarDeletion.avatar);
});
