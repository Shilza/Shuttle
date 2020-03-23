const SUITE_NAME = "Compilations deletePost";
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

const API_POSTS_SAVE = "api/v1/posts/save";
const ENDPOINT = API_POSTS_SAVE;

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

test(`${SUITE_NAME} successful`, async ({client, assert}) => {
  const user = await User.find(1);

  const compilationName = "test";

  const postResponse = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  await Compilation.create({
    owner_id: user.id,
    post_id: postResponse.body.post.id,
    name: compilationName
  });

  const response = await client
    .delete(ENDPOINT)
    .query({post_id: postResponse.body.post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Post deleted from saved successfully");
});
