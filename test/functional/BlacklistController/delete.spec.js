const SUITE_NAME = "Blacklist delete";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Blacklist = use('App/Models/Blacklist');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_BLACKLIST = "api/v1/users/blacklist";
const ENDPOINT = API_BLACKLIST;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .delete(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  })
});

test(`${SUITE_NAME} error Unable to remove yourself from the blacklist`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .query({id: user.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Unable to remove yourself from the blacklist"
  })
});

test(`${SUITE_NAME} error User does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  })
});

test(`${SUITE_NAME} error User is not blacklisted`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User is not blacklisted"
  })
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  await Blacklist.create({
    user_id: user.id,
    blacklisted_id: 2
  });

  const response = await client
    .delete(ENDPOINT)
    .query({id: 2})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Deleted successfully from blacklist");
});

