const SUITE_NAME = "Feed show";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Friendship = use('App/Models/Friendship');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_FEED = "api/v1/feed";
const ENDPOINT = API_FEED;

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

test(`${SUITE_NAME} show error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  await Friendship.create({user_id: user2.id, subscriber_id: user.id});

  const post1 = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user2, 'jwt')
    .end();

  const post2 = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user2, 'jwt')
    .end();

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[0].id, post1.body.post.id);
  assert.equal(response.body.data[1].id, post2.body.post.id);
});
