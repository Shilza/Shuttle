const SUITE_NAME = "Comments show";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Comment = use('App/Models/Comment');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_COMMENTS = "api/v1/comments";
const ENDPOINT = API_COMMENTS;

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
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on post_id"
  })
});

test(`${SUITE_NAME} error Post does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .query({post_id: -1})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post does not exists"
  })
});

test(`${SUITE_NAME} error Profile is private`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  user2.private = 1;
  await user2.save();

  const post = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user2, 'jwt')
    .end();

  const response = await client
    .get(ENDPOINT)
    .query({post_id: post.body.post.id})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Profile is private"
  })
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  const comment = await Comment.create({
    post_id: post.body.post.id,
    owner_id: user.id,
    text: "abc"
  });

  const response = await client
    .get(ENDPOINT)
    .query({post_id: post.body.post.id})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[0].post_id, post.body.post.id);
  assert.equal(response.body.data[0].id, comment.id);
});
