const SUITE_NAME = "Posts add to archive";
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
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on post_id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
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
    .post(ENDPOINT)
    .query({post_id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post does not exists"
  });
});

test(`${SUITE_NAME} error Post already archived`, async ({client, assert}) => {

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
    .post(ENDPOINT)
    .query({post_id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post already archived"
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  const response = await client
    .post(ENDPOINT)
    .query({post_id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Successfully added to the archive");
  assert.isTrue(response.body.post.archive);
});
