const SUITE_NAME = "Password reset";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const Event = use('Event');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_PASSWORD = "api/v1/auth/password";
const ENDPOINT = `${API_PASSWORD}/reset`;

test(`${SUITE_NAME} error Email is required`, async ({client, assert}) => {

  const response = await client
    .post(ENDPOINT)
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Email is required"
  });
});

test(`${SUITE_NAME} error Wrong email format`, async ({client, assert}) => {

  const response = await client
    .post(ENDPOINT)
    .query({email: "abc"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Wrong email format"
  });
});

test(`${SUITE_NAME} error User with this email is not found`, async ({client, assert}) => {

  const response = await client
    .post(ENDPOINT)
    .query({email: "abc@abc.com"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User with this email is not found"
  });
});

test(`${SUITE_NAME} error Password recovery limit exceeded, please check your email or wait until the end of the limit`, async ({client, assert}) => {

  Event.fake();

  await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  const response = await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password recovery limit exceeded, please check your email or wait until the end of the limit"
  });

  Event.restore();
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  Event.fake();

  const response = await client
    .post(ENDPOINT)
    .query({email: "test@test.com"})
    .end();

  response.assertStatus(200);
  response.assertError({
    message: "We have e-mailed your password reset link!"
  });
  const recentEvent = Event.pullRecent();
  assert.equal(recentEvent.event, 'user::passReset');

  Event.restore();
});
