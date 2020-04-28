const SUITE_NAME = "Posts update";
const {test, trait} = use('Test/Suite')('Posts update');
const User = use('App/Models/User');
const Post = use('App/Models/Post');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = API_POSTS;

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
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  });
});

test(`${SUITE_NAME} error max validation failed on location`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({id: 1})
    .field("caption", new Array(1002).join("a"))
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on caption"
  });
});

test(`${SUITE_NAME} error post doesnt exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({id: -1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post does not exists"
  });
});

test(`${SUITE_NAME} error forbidden. Unable to update`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user2.id,
    src: "src"
  });

  const response = await client
    .patch(ENDPOINT)
    .query({id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(403);
  response.assertError({
    message: "Forbidden. Unable to update"
  });
});

test(`${SUITE_NAME} error marks count should be less than 10`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  const response = await client
    .patch(ENDPOINT)
    .query({
      id: post.id,
      marks: JSON.stringify(new Array(12))
    })
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Marks count should be less than 10"
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

  const newCaption = "New caption";
  const marks = [{
    username: "Test",
    top: 10,
    left: 15
  }];
  const response = await client
    .patch(ENDPOINT)
    .query({
      id: post.id,
      caption: newCaption,
      marks: JSON.stringify(marks)
    })
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Post updated successfully");
  assert.equal(response.body.post.caption, newCaption);
  assert.include(response.body.post.marks[0], marks[0]);
});
