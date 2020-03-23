const SUITE_NAME = "Users update avatar";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const NotificationsService = use('NotificationsService');
const UsersService = use('UsersService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

ioc.fake('App/Services/CloudinaryService', () => {
  return {
    v2: {
      uploader: {
        upload: (url, options) => ({
          url: `http://res.cloudinary.com/mediashuttle/image/upload/v1583655289/${options.public_id}.png`
        })
      }
    }
  }
});

const API_USERS = "api/v1/users";
const ENDPOINT = `${API_USERS}/avatar`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {
  const response = await client
    .put(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error avatar is required`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .put(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "avatar is required"
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .put(ENDPOINT)
    .attach("avatar", "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Avatar successfully updated");
  assert.isString(response.body.avatar);
});
