const SUITE_NAME = "Posts showPostByCode";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const PostsService = use('PostsService');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const API_POSTS = "api/v1/posts";

ioc.fake('PostsService', () => {
  return {
    getPostsOwnerByPostCode: PostsService.getPostsOwnerByPostCode,
    getPostByCode: PostsService.getPostByCode,
    async contentDistribution() {
      // no op
    }
  }
});

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

test(`${SUITE_NAME} error does not exists`, async ({client, assert}) => {

  const code = "invalid code";
  const user = await User.find(1);

  const response = await client
    .get(`${API_POSTS}/${code}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
  assert.equal(response.body.message, "Post does not exists");
});

test(`${SUITE_NAME} successfully`, async ({client, assert}) => {

  const user = await User.find(1);

  const responseCreatedPost = await client
    .post(API_POSTS)
    .field("marks", JSON.stringify([]))
    .attach('media', "./test/assets/sample.jpg")
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
});
