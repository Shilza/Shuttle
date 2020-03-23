const SUITE_NAME = "Posts show";
const {test, trait} = use('Test/Suite')('Posts show');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = API_POSTS;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error validation error`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: 'required validation failed on owner_id'
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({owner_id: user.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
});
