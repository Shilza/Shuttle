const SUITE_NAME = "Likes like";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Like = use('App/Models/Like');
const Comment = use('App/Models/Comment');
const LikesService = use('LikesService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_LIKES = "api/v1/like";
const ENDPOINT = API_LIKES;

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

test(`${SUITE_NAME} error required validation failed on type`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on type"
  })
});

test(`${SUITE_NAME} error required validation failed on entity_id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({type: 1})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on entity_id"
  })
});

test(`${SUITE_NAME} error Type does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({entity_id: -1, type: -1})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Type does not exists"
  })
});

test(`${SUITE_NAME} error Like already exists (posts)`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  await Like.create({entity_id: post.body.post.id, owner_id: user.id, type: 1});

  const response = await client
    .post(ENDPOINT)
    .query({entity_id: post.body.post.id, type: "post"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Like already exists"
  })
});

test(`${SUITE_NAME} error Like already exists (comments)`, async ({client, assert}) => {

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

  await Like.create({entity_id: comment.id, owner_id: user.id, type: 2});

  const response = await client
    .post(ENDPOINT)
    .query({entity_id: comment.id, type: "comment"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Like already exists"
  })
});

test(`${SUITE_NAME} error Comment does not exists`, async ({client, assert}) => {

  const user = await User.find(1);
  const response = await client
    .post(ENDPOINT)
    .query({entity_id: -1, type: "comment"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Comment does not exists"
  })
});

test(`${SUITE_NAME} error Profile is private (comments)`, async ({client, assert}) => {

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

  const comment = await Comment.create({
    post_id: post.body.post.id,
    owner_id: user.id,
    text: "abc"
  });

  const response = await client
    .post(ENDPOINT)
    .query({entity_id: comment.id, type: "comment"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Profile is private"
  })
});

test(`${SUITE_NAME} error Profile is private (posts)`, async ({client, assert}) => {

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
    .query({entity_id: post.body.post.id, type: "post"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Profile is private"
  })
});

test(`${SUITE_NAME} error Post does not exists`, async ({client, assert}) => {

  const user = await User.find(1);
  const response = await client
    .post(ENDPOINT)
    .query({entity_id: -1, type: "comment"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Comment does not exists"
  })
});

test(`${SUITE_NAME} successful (comment)`, async ({client, assert}) => {

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
    .post(ENDPOINT)
    .query({entity_id: comment.id, type: "comment"})
    .loginVia(user, "jwt")
    .end();

  const like = await LikesService.isLikeExists(user.id, comment.id, 2);

  response.assertStatus(200);
  assert.equal(response.body.message, "Comment liked successfully");
  assert.isTrue(like);
});

test(`${SUITE_NAME} successful (post)`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  const response = await client
    .post(ENDPOINT)
    .query({entity_id: post.body.post.id, type: "post"})
    .loginVia(user, "jwt")
    .end();

  const like = await LikesService.isLikeExists(user.id, post.body.post.id, 1);

  response.assertStatus(200);
  assert.equal(response.body.message, "Post liked successfully");
  assert.isTrue(like);
});
