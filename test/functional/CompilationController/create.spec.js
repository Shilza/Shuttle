const SUITE_NAME = "Compilations create";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Compilation = use('App/Models/Compilation');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

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

const API_COMPILATIONS = "api/v1/posts/save";
const ENDPOINT = API_COMPILATIONS;

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

test(`${SUITE_NAME} error integer validation failed on post_id`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: "a"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "integer validation failed on post_id"
  })
});

test(`${SUITE_NAME} error required validation failed on compilation`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: 1})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on compilation"
  });
});

test(`${SUITE_NAME} error min validation failed on compilation`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: 1, compilation: "a"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "min validation failed on compilation"
  });
});

test(`${SUITE_NAME} error max validation failed on compilation`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: 1, compilation: new Array(20).fill("a").join("")})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on compilation"
  });
});

test(`${SUITE_NAME} error regex validation failed on compilation`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: 1, compilation: "!!!"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "regex validation failed on compilation"
  });
});

test(`${SUITE_NAME} error Post does not exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .query({post_id: -1, compilation: "abc"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Post does not exists"
  });
});

test(`${SUITE_NAME} error Profile is private`, async ({client, assert}) => {
  const user = await User.find(1);
  const user2 = await User.find(2);

  user2.private = true;
  await user2.save();

  const compilationName = "test";

  const postResponse = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user2, 'jwt')
    .end();

  const response = await client
    .post(ENDPOINT)
    .query({post_id: postResponse.body.post.id, compilation: compilationName})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  assert.equal(response.body.message, "Profile is private");
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  const compilationName = "test";

  const postResponse = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  const response = await client
    .post(ENDPOINT)
    .query({post_id: postResponse.body.post.id, compilation: compilationName})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Post saved successfully");
});
