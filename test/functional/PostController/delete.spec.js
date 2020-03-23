const SUITE_NAME = "Posts delete";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const User = use('App/Models/User');
const Post = use('App/Models/Post');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = API_POSTS;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .delete(ENDPOINT)
    .end();

  response.assertStatus(401);
});


test(`${SUITE_NAME} error required validation failed on id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  });
});

test(`${SUITE_NAME} error Post does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post does not exists"
  })
});

test(`${SUITE_NAME} error Forbidden. Unable to delete`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  const response = await client
    .delete(ENDPOINT)
    .query({id: post.id})
    .loginVia(user2, 'jwt')
    .end();

  response.assertStatus(403);
  response.assertError({
    message: "Forbidden. Unable to delete"
  })
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  const response = await client
    .delete(ENDPOINT)
    .query({id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Post deleted successfully");
});
