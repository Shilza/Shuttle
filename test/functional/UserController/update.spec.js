const SUITE_NAME = "Users update";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_USERS = "api/v1/users";
const ENDPOINT = API_USERS;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .patch(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error Nothing to update`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Nothing to update"
  });
});

test('users update error Username must be at least 2 characters', async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({username: "1"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username must be at least 2 characters"
  });
});

test(`${SUITE_NAME} error Username must be less than 16 characters`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({username: new Array(20).join('a')})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username must be less than 16 characters"
  });
});

test(`${SUITE_NAME} error regex validation failed on username`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({username: "Aaaa"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "regex validation failed on username"
  });
});

test(`${SUITE_NAME} error max validation failed on bio`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({bio: new Array(102).join("a")})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on bio"
  });
});

test(`${SUITE_NAME} error max validation failed on site`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({site: new Array(52).join("a")})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on site"
  });
});

test(`${SUITE_NAME} error Username already exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({username: "test1"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username already exists"
  });
});


test(`${SUITE_NAME} update successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  const dataForUpdate = {
    username: "newtestname",
    bio: "newbio",
    site: "newsite"
  };

  const response = await client
    .patch(ENDPOINT)
    .query(dataForUpdate)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Updated successfully");
  assert.equal(response.body.user.username, dataForUpdate.username);
  assert.equal(response.body.user.bio, dataForUpdate.bio);
  assert.equal(response.body.user.site, dataForUpdate.site);
  assert.hasAllKeys(response.body.user, ["id", "username", "bio", "site", "avatar", "private", "unreadDialogs", "notificationsCount", "__meta__"])
});
