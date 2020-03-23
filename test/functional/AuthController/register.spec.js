const SUITE_NAME = "Auth register";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const Event = use('Event');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_AUTH = "api/v1/auth";
const ENDPOINT = `${API_AUTH}/register`;

test(`${SUITE_NAME} error email is required`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Email is required"
  })
});

test(`${SUITE_NAME} error email is required`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "123"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Wrong email format"
  })
});

test(`${SUITE_NAME} error Email already exists`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Email already exists"
  })
});

test(`${SUITE_NAME} error username is required`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username is required"
  });
});

test(`${SUITE_NAME} error Username must be at least 2 characters`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "1"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username must be at least 2 characters"
  });
});

test(`${SUITE_NAME} error Username must be less than 16 characters`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "1111111111111111"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username must be less than 16 characters"
  });
});

test(`${SUITE_NAME} error regex validation failed on username`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "TEST"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "regex validation failed on username"
  });
});


test(`${SUITE_NAME} error Username already exists`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "test"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Username already exists"
  });
});

test(`${SUITE_NAME} error password is required`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "newtest"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password is required"
  });
});

test(`${SUITE_NAME} error password must be at least 8 characters`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "newtest", password: "123"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be at least 8 characters"
  });
});

test(`${SUITE_NAME} error Password must be less than 32 characters`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "newtest", password: new Array(40).join('a')})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be less than 32 characters"
  });
});

test(`${SUITE_NAME} error Password must be confirmed`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", username: "newtest", password: "newtestpass"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be confirmed"
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Email already exists"
  })
});

test(`${SUITE_NAME} successfully check event`, async ({client, assert}) => {
  Event.fake();

  const response = await client
    .post(ENDPOINT)
    .query({
      username: "newtest",
      password: "newtestpass",
      password_confirmation: "newtestpass",
      email: "newtest@test.com"
    })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Registered successfully. Please, log in");

  const recentEvent = Event.pullRecent();
  assert.equal(recentEvent.event, 'user::register');

  Event.restore();
});
