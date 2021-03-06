'use strict';
const Post = use('App/Models/Post');
const User = use('App/Models/User');
const Feed = use('App/Models/Feed');
const Mark = use('App/Models/Mark');
const Friendship = use('App/Models/Friendship');
const {validate} = use('CValidator');
const PostsService = use('PostsService');
const LikesService = use('LikesService');
const UsersService = use('UsersService');
const CloudinaryService = use('App/Services/CloudinaryService');

class PostController {

  async showPostByCode({request, response, auth, params}) {

    const user = await auth.getUser();

    const owner = await PostsService.getPostsOwnerByPostCode(params.code);

    if (!owner)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    const canSee = await UsersService.canSee(owner, user.id);

    if (canSee) {
      const post = await PostsService.getPostByCode(params.code, user);

      if (!post)
        return response.status(400).json({
          message: 'Post does not exists'
        });

      return response.json({post});
    }

    return response.status(400).json({message: 'Post is private'});
  }

  async show({request, response, auth}) {

    const rules = {
      owner_id: 'required|integer',
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await auth.getUser();

    const ownerId = parseInt(request.input('owner_id'), 10);

    const owner = await User.find(ownerId);

    const canSee = await UsersService.canSee(owner, user.id);

    if (canSee) {
      const posts = await PostsService.getPostsByOwner(ownerId, user.id, page);
      return response.json(posts);
    } else
      return response.json({private: true});
  }

  async showArchived({request, response, auth}) {

    const rules = {
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await auth.getUser();
    const posts = await PostsService.getArchivedPosts(user, page);

    response.json(posts);
  }

  async showLikedPosts({request, response, auth}) {
    const rules = {
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await auth.getUser();

    const likedPosts = await PostsService.getLikedPosts(user.id, page);

    response.json(likedPosts);
  }

  async showMarkedPosts({request, response, auth}) {
    const rules = {
      page: 'integer',
      user_id: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await auth.getUser();

    const ownerId = parseInt(request.input('user_id'), 10);

    const owner = await User.find(ownerId);

    const canSee = await UsersService.canSee(owner, user.id);

    if (canSee) {
      const posts = await PostsService.getMarkedPosts(request.input('user_id'), page);
      return response.json(posts);
    } else
      return response.json({private: true});
  }

  async showLikes({request, response, auth}) {
    const rules = {
      page: 'integer',
      post_id: 'integer|required'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();

    const postId = request.input('post_id');
    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const post = await Post.find(postId);

    if (!post)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    const owner = await PostsService.getPostsOwnerByPostId(postId);

    const canSee = await UsersService.canSee(owner, user.id);

    if (canSee) {
      const users = await LikesService.getUsersLikesByPostId(postId, page);
      return response.json(users);
    } else
      return response.json({private: true});
  }

  async create({request, response, auth}) {

    const {v4: uuidv4} = require('uuid');

    const rules = {
      caption: 'string|max:1000',
      location: 'string|max:100',
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const marks = request.input('marks') ? JSON.parse(request.input('marks')) : null;

    if (!Array.isArray(marks))
      return response.status(400).json({
        message: 'Marks should be an array'
      });

    if (marks.length > 10)
      return response.status(400).json({
        message: 'Marks count should be less than 10'
      });

    const user = await auth.getUser();
    const postMedia = request.file('media', {
      types: ['image', 'video'],
      size: '10mb'
    });

    if (!postMedia)
      return response.status(400).json({
        message: 'media is required'
      });

    const cdnOptions = {resource_type: postMedia.type, public_id: `${user.id}/${uuidv4()}`};
    const cdnResult = await CloudinaryService.v2.uploader.upload(postMedia.tmpPath, cdnOptions);

    const postDataCaption = request.input('caption');
    const postDataLocation = request.input('location');

    let post = await Post.create({
      caption: postDataCaption,
      location: postDataLocation,
      owner_id: user.id,
      src: cdnResult.url
    });

    post.owner = user.username;
    post.avatar = user.avatar;
    post.isLiked = false;
    post.likes_count = 0;
    post.comments_count = 0;

    const marksPromises = marks.map(mark =>
      Mark.create({
        post_id: post.id,
        ...mark
      })
    );

    post.marks = await Promise.all(marksPromises);

    await PostsService.contentDistribution(post.id, user.id);

    response.json({
      message: 'Post successfully created',
      post
    });
  }

  async update({request, response, auth}) {

    const rules = {
      id: 'required|integer',
      caption: 'string|max:1000'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const post = await Post.find(request.input('id'));

    if (!post)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    const user = await auth.getUser();
    if (!user.isOwner(post))
      return response.status(403).json({
        message: 'Forbidden. Unable to update'
      });

    const data = request.all();
    let receivedMarks = [];
    try {
      receivedMarks = JSON.parse(data.marks);
    } catch {}

    if (!Array.isArray(receivedMarks))
      return response.status(400).json({
        message: 'Marks should be an array'
      });

    if (receivedMarks.length > 10)
      return response.status(400).json({
        message: 'Marks count should be less than 10'
      });

    if (receivedMarks.length > 0) {
      await PostsService.removeMarksByPostId(post.id);

      await Promise.all(receivedMarks.map(mark => Mark.create({...mark, post_id: post.id})));
    }

    delete data.marks;

    post.merge(data);
    await post.save();

    response.json({message: 'Post updated successfully', post: await PostsService.getPostById(user.id, post.id)});
  }

  async delete({request, response, auth}) {

    const rules = {
      id: 'required|integer',
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const post = await Post.find(request.input('id'));

    if (!post)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    const user = await auth.getUser();
    if (!user.isOwner(post))
      return response.status(403).json({
        message: 'Forbidden. Unable to delete'
      });

    await post.delete();

    response.json({message: 'Post deleted successfully'});
  }

  async addToArchive({request, response, auth}) {
    const rules = {
      post_id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();

    const post = await Post
      .query()
      .where('id', request.input('post_id'))
      .where('owner_id', user.id)
      .first();

    if (!post)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    if (post.archive)
      return response.status(400).json({
        message: 'Post already archived'
      });

    post.archive = true;
    await post.save();

    response.json({
      message: 'Successfully added to the archive',
      post
    });
  }

  async deleteFromArchive({request, response, auth}) {
    const rules = {
      post_id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();

    const post = await Post
      .query()
      .where('id', request.input('post_id'))
      .where('owner_id', user.id)
      .first();

    if (!post)
      return response.status(400).json({
        message: 'Post does not exists'
      });

    if (!post.archive)
      return response.status(400).json({
        message: 'Post already available'
      });

    post.archive = false;
    await post.save();

    response.json({
      message: 'Successfully unarchived',
      post
    });
  }
}

module.exports = PostController;
