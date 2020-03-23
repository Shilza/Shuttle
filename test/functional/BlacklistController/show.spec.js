const SUITE_NAME = "Blacklist show";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const Blacklist = use('App/Models/Blacklist');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_BLACKLIST = "api/v1/users/blacklist";
const ENDPOINT = API_BLACKLIST;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);

  await Blacklist.create({
    user_id: user.id,
    blacklisted_id: 2
  });

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.equal(response.body.data[0].id, 2);
});
