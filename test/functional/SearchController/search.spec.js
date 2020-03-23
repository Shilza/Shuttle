const SUITE_NAME = "Search search";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_SEARCH = "api/v1/search";
const ENDPOINT = API_SEARCH;

test(`${SUITE_NAME} error Username is required`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username is required"
  });
});


test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const response = await client
    .get(ENDPOINT)
    .query({username: "test"})
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[0].username, "test");
  assert.equal(response.body.data[1].username, "test1");
});
