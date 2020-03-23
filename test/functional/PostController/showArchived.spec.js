const SUITE_NAME = "Posts showArchived";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Post = use('App/Models/Post');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = "api/v1/posts/archive";

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  post.merge({
    archive: true
  });
  await post.save();

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
  assert.equal(response.body.data[0].id, post.id);
});

