const SUITE_NAME = "Comments update";
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
    .patch(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  })
});

test(`${SUITE_NAME} error required validation failed on text`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({id: 1})
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
    .patch(ENDPOINT)
    .query({id: 1, text: new Array(1010).fill("a").join("")})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on text"
  })
});

test(`${SUITE_NAME} error Comment does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({id: -1, text: "aaa"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Comment does not exists"
  })
});

test(`${SUITE_NAME} error Forbidden. Unable to update`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

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
    .patch(ENDPOINT)
    .query({id: comment.id, text: "aaa"})
    .loginVia(user2, "jwt")
    .end();

  response.assertStatus(403);
  response.assertError({
    message: "Forbidden. Unable to update"
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

  const text = "test text";

  const response = await client
    .patch(ENDPOINT)
    .query({id: comment.id, text})
    .loginVia(user, "jwt")
    .end();

  const commentById = await Comment.find(comment.id);

  response.assertStatus(200);
  assert.equal(response.body.message, "Comment successfully updated");
  assert.equal(commentById.text, text);
});
