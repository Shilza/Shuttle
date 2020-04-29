const SUITE_NAME = "Posts create";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const PostsService = use('PostsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";
const ENDPOINT = API_POSTS;

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

ioc.fake('PostsService', () => {
  return {
    getPostsOwnerByPostCode: PostsService.getPostsOwnerByPostCode,
    getPostByCode: PostsService.getPostByCode,
    async contentDistribution() {
      // no op
    }
  }
});

test(`${SUITE_NAME} error 401`, async ({client}) => {

  const response = await client
    .post(ENDPOINT)
    .field("marks", JSON.stringify([]))
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error media is required`, async ({client}) => {
  const user = await User.find(1);

  const response = await client
    .post(API_POSTS)
    .field("marks", JSON.stringify([]))
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "media is required"
  });
});

test(`${SUITE_NAME} marks should be an array error`, async ({client}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: 'Marks should be an array'
  });
});


test(`${SUITE_NAME} max validation failed on location`, async ({client}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .field("location", new Array(102).join("a"))
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on location"
  });
});

test(`${SUITE_NAME} max validation failed on caption`, async ({client}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .field("caption", new Array(1002).join("a"))
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on caption"
  });
});

test(`${SUITE_NAME} marks count should be less than 10`, async ({client}) => {

  const user = await User.find(1);

  const response = await client
    .post(ENDPOINT)
    .field("marks", JSON.stringify(new Array(12)))
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: 'Marks count should be less than 10'
  });
});

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .post(API_POSTS)
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Post successfully created");
});
