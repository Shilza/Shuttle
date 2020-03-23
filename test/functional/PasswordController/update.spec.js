const SUITE_NAME = "Password update";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const Event = use('Event');
const User = use('App/Models/User');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_PASSWORD = "api/v1/auth/password";
const ENDPOINT = `${API_PASSWORD}/update`;

test(`${SUITE_NAME} error Email is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Email is required"
  });
});

test(`${SUITE_NAME} error Wrong email format`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({email: "abc"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Wrong email format"
  });
});

test(`${SUITE_NAME} error Password is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({email: "abc@abc.com"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password is required"
  });
});

test(`${SUITE_NAME} error Password is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({email: "abc@abc.com"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password is required"
  });
});

test(`${SUITE_NAME} error password must be at least 8 characters`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", password: "123"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be at least 8 characters"
  });
});

test(`${SUITE_NAME} error Password must be less than 32 characters`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", password: new Array(40).join('a')})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be less than 32 characters"
  });
});

test(`${SUITE_NAME} error Password must be confirmed`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({email: "newtest@test.com", password: "newtestpass"})
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Password must be confirmed"
  });
});

test(`${SUITE_NAME} error Update token is required`, async ({client, assert}) => {
  const response = await client
    .post(ENDPOINT)
    .query({
      password: "newtestpass",
      password_confirmation: "newtestpass",
      email: "test@test.com"
    })
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Update token is required"
  });
});

test(`${SUITE_NAME} error Invalid email or reset token`, async ({client, assert}) => {
  Event.fake();

  const user = await User.find(1);

  await client
    .post(`${API_PASSWORD}/reset`)
    .query({email: "test@test.com"})
    .loginVia(user, 'jwt')
    .end();

  const recentEvent = Event.pullRecent();

  const response = await client
    .post(ENDPOINT)
    .query({
      password: "newtestpass",
      password_confirmation: "newtestpass",
      email: "test222@test.com",
      token: recentEvent.data[1]
    })
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Invalid email or reset token"
  });
});

test(`${SUITE_NAME} error Invalid email or reset token`, async ({client, assert}) => {

  const response = await client
    .post(ENDPOINT)
    .query({
      password: "newtestpass",
      password_confirmation: "newtestpass",
      email: "test@test.com",
      token: "aaaa"
    })
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Invalid email or reset token"
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  Event.fake();
  const newPass = "newtestpass";

  const user = await User.find(1);

  await client
    .post(`${API_PASSWORD}/reset`)
    .query({email: "test@test.com"})
    .loginVia(user, 'jwt')
    .end();

  let recentEvent = Event.pullRecent();

  const response = await client
    .post(ENDPOINT)
    .query({
      email: "test@test.com",
      password: newPass,
      password_confirmation: newPass,
      token: recentEvent.data[1]
    })
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  response.assertError({
    message: "Reset successfully! Please, login"
  });
  recentEvent = Event.pullRecent();
  assert.equal(recentEvent.event, 'user::passUpdate');

  Event.restore();

  const loginResponse = await client
    .post('api/v1/auth/login')
    .query({username: user.username, password: newPass})
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(loginResponse.body, ["type", "token", "refreshToken", "expiresIn", "user"]);
});
