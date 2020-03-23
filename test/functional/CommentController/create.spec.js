const SUITE_NAME = "Comments create";
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
    .post(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on post_id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on post_id"
  })
});

test(`${SUITE_NAME} error required validation failed on text`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: 1})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on text"
  })
});

test(`${SUITE_NAME} error max validation failed on text`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: 1, text: new Array(1010).fill("a").join("")})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on text"
  })
});

test(`${SUITE_NAME} error Post does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: -1, text: "aaa"})
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
    .post(ENDPOINT)
    .query({post_id: post.body.post.id, text: "aaa"})
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

  await Comment.create({
    post_id: post.body.post.id,
    owner_id: user.id,
    text: "abc"
  });

  const text = "test text";

  const response = await client
    .post(ENDPOINT)
    .query({post_id: post.body.post.id, text})
    .loginVia(user, "jwt")
    .end();

  const commentById = await Comment.find(response.body.id);

  response.assertStatus(200);
  assert.equal(response.body.text, text);
  assert.isNotNull(commentById);
});
