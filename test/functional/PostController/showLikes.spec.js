const SUITE_NAME = "Posts showLikes";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Like = use('App/Models/Like');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = `${API_POSTS}/likes`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on post_id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: 'required validation failed on post_id'
  });
});

test(`${SUITE_NAME} error post doesnt exist`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({post_id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: 'Post does not exists'
  });
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  await Like.create({entity_id: post.id, owner_id: user.id, type: 1});

  const response = await client
    .get(ENDPOINT)
    .query({post_id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
  assert.equal(response.body.data[0].username, user.username);
});

