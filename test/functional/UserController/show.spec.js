const SUITE_NAME = "Users show";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = API_USERS;

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

test(`${SUITE_NAME}w error User does not exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({username: "testtest"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({username: "test1"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body,
    ["id", "username", "avatar", "bio", "blacklisted", "canSee", "amBlacklisted", "friendshipState", "__meta__", "private", "site"]
  );
  assert.hasAllKeys(response.body.__meta__, ["posts_count", "followers_count", "follows_count"]);
});
