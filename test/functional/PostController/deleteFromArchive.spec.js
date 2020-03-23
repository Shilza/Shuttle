const SUITE_NAME = "Posts delete from archive";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Post = use('App/Models/Post');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = `${API_POSTS}/archive`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .delete(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on post_id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on post_id"
  });
});

test(`${SUITE_NAME} error required validation failed on post_id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on post_id"
  });
});


test(`${SUITE_NAME} error Post does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .query({post_id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post does not exists"
  });
});

test(`${SUITE_NAME} error Post already available`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  const response = await client
    .delete(ENDPOINT)
    .query({post_id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post already available"
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

  post.archive = true;
  await post.save();

  const response = await client
    .delete(ENDPOINT)
    .query({post_id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Successfully unarchived");
  assert.isFalse(response.body.post.archive);
});
