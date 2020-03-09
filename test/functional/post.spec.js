const {test, trait} = use('Test/Suite')('Posts');
const {before, beforeEach, after, afterEach} = use('Test/Suite')('Posts');
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Like = use('App/Models/Like');
const Mark = use('App/Models/Mark');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";

// TODO протестировать canSee у всех

// const post = await Post.create({
//   caption: "caption",
//   location: "location",
//   owner_id: user.id,
//   src: "src"
// });

test('get post by code error', async ({client, assert}) => {

  const code = "invalid code";
  const user = await User.find(1);

  const response = await client
    .get(`${API_POSTS}/${code}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  assert.equal(response.body.message, "Post does not exists");
});

test('get post by code cannot see error', async ({client, assert}) => {

  const user = await User.find(1);

  const responseCreatedPost = await client
    .post(API_POSTS)
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/functional/sample.jpg")
    .loginVia(user, "jwt")
    .end();

  const createdPost = responseCreatedPost.body.post;
  const code = createdPost.src.match(/(?!.*\/.*).+(?=\.)/)[0];

  ioc.fake('UsersService', () => {
    return {
      canSee() {
        return false;
      }
    }
  });

  const response = await client
    .get(`${API_POSTS}/${code}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  assert.equal(response.body.message, "Post is private");

  ioc.restore();
});


test('get post by code', async ({client, assert}) => {

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

  const user = await User.find(1);

  const responseCreatedPost = await client
    .post(API_POSTS)
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/functional/sample.jpg")
    .loginVia(user, 'jwt')
    .end();

  const createdPost = responseCreatedPost.body.post;
  const code = createdPost.src.match(/(?!.*\/.*).+(?=\.)/)[0];

  const response = await client
    .get(`${API_POSTS}/${code}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.deepEqual(response.body.post, {
    id: createdPost.id,
    owner_id: user.id,
    src: createdPost.src,
    caption: null,
    location: null,
    archive: 0,
    __meta__: {"comments_count": 0, "likes_count": 0},
    isLiked: false,
    isSaved: false,
    owner: user.username,
    avatar: user.avatar,
    marks: [],
    created_at: createdPost.created_at
  });

  ioc.restore();
});


test('get posts list', async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(API_POSTS)
    .query({owner_id: user.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array")
});

test('get posts list validation error', async ({client, assert}) => {

  const user = await User.find(1);

  const response = await client
    .get(API_POSTS)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  response.assertError({
    message: 'required validation failed on owner_id'
  });
});

test('get archived posts', async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  post.merge({
    archive: true
  });
  await post.save();

  const response = await client
    .get(`${API_POSTS}/archive`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
  assert.equal(response.body.data[0].id, post.id);
});

test('get liked posts', async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  await Like.create({entity_id: post.id, owner_id: user.id, type: 1});

  const response = await client
    .get(`${API_POSTS}/liked`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
  assert.equal(response.body.data[0].id, post.id);
});

test('get marked posts', async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  await Mark.create({
    post_id: post.id,
    username: user.username
  });

  const response = await client
    .get(`${API_POSTS}/marked`)
    .query({user_id: user.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
  assert.equal(response.body.data[0].id, post.id);
});

test('get posts\'s likes', async ({client, assert}) => {

  const user = await User.find(1);

  const post = await Post.create({
    caption: "caption",
    location: "location",
    owner_id: user.id,
    src: "src"
  });

  await Like.create({entity_id: post.id, owner_id: user.id, type: 1});

  const response = await client
    .get(`${API_POSTS}/likes`)
    .query({post_id: post.id})
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.typeOf(response.body.data, "Array");
  assert.equal(response.body.data[0].username, user.username);
});
