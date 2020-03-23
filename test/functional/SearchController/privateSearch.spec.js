const SUITE_NAME = "Search private search";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_SEARCH = "api/v1/privateSearch";
const ENDPOINT = API_SEARCH;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error rUsername is required`, async ({client, assert}) => {
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


test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);
  const user2 = await User.find(2);
  const user3 = await User.create({username: "test2", email: "test2@test.com", password: "testtest"});

  // Remove private accounts from search
  user2.private = 1;
  await user2.save();

  const response = await client
    .get(ENDPOINT)
    .query({username: "test"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[0].username, user.username);
  assert.equal(response.body.data[1].username, user3.username);
});
