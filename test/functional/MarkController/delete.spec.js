const SUITE_NAME = "Mark delete";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Mark = use('App/Models/Mark');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_MARKS = "api/v1/marks";
const ENDPOINT = API_MARKS;

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
    .delete(ENDPOINT)
    .end();

  response.assertStatus(401);
});

test(`${SUITE_NAME} error required validation failed on id`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "required validation failed on id"
  })
});

test(`${SUITE_NAME} error Mark does not exists`, async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .delete(ENDPOINT)
    .query({id: -1})
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(400);
  response.assertError({
    message: "Mark does not exists"
  })
});

test(`${SUITE_NAME} error Forbidden. Unable to delete`, async ({client, assert}) => {

  const user = await User.find(1);
  const user2 = await User.find(2);

  const post = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([{
      username: user2.username
    }]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  const response = await client
    .delete(ENDPOINT)
    .query({id: post.body.post.marks[0].id})
    .loginVia(user, "jwt")
    .end();


  response.assertStatus(403);
  response.assertError({
    message: "Forbidden. Unable to delete"
  })
});

test(`${SUITE_NAME} error Forbidden. Unable to delete`, async ({client, assert}) => {

  const user = await User.find(1);

  const post = await client
    .post("api/v1/posts")
    .field("marks", JSON.stringify([{
      username: user.username
    }]))
    .attach('media', "./test/assets/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  const markId = post.body.post.marks[0].id;

  const response = await client
    .delete(ENDPOINT)
    .query({id: markId})
    .loginVia(user, "jwt")
    .end();

  const mark = await Mark.find(markId);

  response.assertStatus(200);
  assert.equal(response.body.message, "Mark deleted successfully");
  assert.isNull(mark);
});
