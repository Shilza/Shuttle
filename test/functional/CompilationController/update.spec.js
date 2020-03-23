const SUITE_NAME = "Compilations update";
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
const ENDPOINT = API_COMPILATIONS;

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const response = await client
    .patch(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on old_compilation_name`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on old_compilation_name"
  })
});

test(`${SUITE_NAME} error min validation failed on old_compilation_name`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: "a"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "min validation failed on old_compilation_name"
  });
});

test(`${SUITE_NAME} error max validation failed on old_compilation_name`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: new Array(33).fill("a").join("")})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on old_compilation_name"
  });
});

test(`${SUITE_NAME} error required validation failed on new_compilation_name`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: "aaa"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on new_compilation_name"
  })
});

test(`${SUITE_NAME} error min validation failed on new_compilation_name`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: "aaa", new_compilation_name: "a"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "min validation failed on new_compilation_name"
  });
});

test(`${SUITE_NAME} error max validation failed on new_compilation_name`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: "aaa", new_compilation_name: new Array(33).fill("a").join("")})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "max validation failed on new_compilation_name"
  });
});

test(`${SUITE_NAME} error Compilation does not exists`, async ({client, assert}) => {
  const user = await User.find(1);

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: "aaa", new_compilation_name: "aaa"})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Compilation does not exists"
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

  const compilationResponse = await Compilation.create({
    owner_id: user.id,
    post_id: postResponse.body.post.id,
    name: compilationName
  });

  const response = await client
    .patch(ENDPOINT)
    .query({old_compilation_name: compilationResponse.name, new_compilation_name: "aaa"})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  assert.equal(response.body.message, "Compilation name updated successfully");
});
