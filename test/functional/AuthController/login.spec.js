const SUITE_NAME = "Auth login";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_AUTH = "api/v1/auth";
const ENDPOINT = `${API_AUTH}/login`;

test(`${SUITE_NAME} error username is required`, async ({client}) => {
  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username is required"
  });
});

test(`${SUITE_NAME} error Username must be at least 2 characters`, async ({client}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "1"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username must be at least 2 characters"
  });
});

test(`${SUITE_NAME} error Username must be less than 16 characters`, async ({client}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: new Array(18).fill("a").join("")})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username must be less than 16 characters"
  });
});

test(`${SUITE_NAME} error password is required`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "test"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password is required"
  });
});

test(`${SUITE_NAME} error password must be at least 8 characters`, async ({client}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "newtest", password: "123"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be at least 8 characters"
  });
});

test(`${SUITE_NAME} error Password must be less than 32 characters`, async ({client}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "newtest", password: new Array(40).join('a')})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be less than 32 characters"
  });
});

test(`${SUITE_NAME} error User does not exists`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "newtest", password: "newtestpass"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test(`${SUITE_NAME} error Incorrect login or password`, async ({client}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "test", password: "newtestpass"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Incorrect login or password"
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({username: "test", password: "testtest"})
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["type", "token", "refreshToken", "expiresIn", "user"]);
});

