const SUITE_NAME = "Dialog show";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Dialog = use('App/Models/Dialog');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_DIALOGS = "api/v1/dialogs";
const ENDPOINT = API_DIALOGS;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(`${ENDPOINT}/test`)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error User does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(`${ENDPOINT}/faketest123`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "User does not exists"
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const message1 = await Dialog.create({
    owner_id: user.id,
    receiver_id: user2.id,
    message: "abc"
  });

  const message2 = await Dialog.create({
    owner_id: user2.id,
    receiver_id: user.id,
    message: "cba"
  });

  const response = await client
    .get(`${ENDPOINT}/${user2.username}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[1].id, message1.id);
  assert.equal(response.body.data[0].id, message2.id);
});
