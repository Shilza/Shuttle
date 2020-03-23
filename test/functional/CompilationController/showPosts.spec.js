const SUITE_NAME = "Compilations showPosts";
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

const API_COMPILATIONS = "api/v1/compilations";
const ENDPOINT = `${API_COMPILATIONS}/posts`;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .get(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on compilation`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .get(ENDPOINT)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on compilation"
  })
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
    .get(ENDPOINT)
    .query({compilation: compilationName})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  assert.hasAllKeys(response.body, ["total", "perPage", "page", "lastPage", "data"]);
  assert.isArray(response.body.data);
  assert.equal(response.body.data[0].id, postResponse.body.post.id);
});
