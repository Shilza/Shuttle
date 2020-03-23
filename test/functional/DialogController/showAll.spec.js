const SUITE_NAME = "Dialog showAll";
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
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  await Dialog.create({
    owner_id: user.id,
    receiver_id: user2.id,
    message: "abc"
  });

  await Dialog.create({
    owner_id: user2.id,
    receiver_id: user.id,
    message: "cba"
  });

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.lengthOf(response.body.data, 1);
  assert.equal(response.body.data[0].user.id, user2.id);
});
