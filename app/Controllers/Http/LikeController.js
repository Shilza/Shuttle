'use strict';

const Like = use('App/Models/Like');
const Post = use('App/Models/Post');
const Comment = use('App/Models/Comment');
const EntityType = use('App/Models/EntityType');
const {validate} = use('CValidator');
const LikesService = use('LikesService');
const UsersService = use('UsersService');
const PostsService = use('PostsService');

class LikeController {

  async like({request, response, auth}) {
    const rules = {
      type: 'required|string',
      entity_id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const type = await EntityType.findBy('type', request.input('type'));
    if (!type)
      return response.status(400).json({
        message: 'Type does not exists'
      });

    const entity_id = request.input('entity_id');
    const user = await auth.getUser();

    const like = await LikesService.isLikeExists(user.id, entity_id, type.id);
    if (like)
      return response.json({message: 'Like already exists'});

    switch (type.type) {
      case 'comment': {
        const comment = await Comment.find(entity_id);
        if (!comment)
          return response.status(400).json({
            message: 'Comment does not exists'
          });

        const owner = await PostsService.getPostsOwnerByPostId(comment.post_id);
        const canSee = await UsersService.canSee(owner, user.id);
        if (canSee) {
          await Like.create({entity_id, owner_id: user.id, type: type.id});
          return response.json({message: 'Comment liked successfully'});
        } else
          return response.status(400).json({message: 'Profile is private'});
      }
      case 'post':
        const post = await Post.find(entity_id);
        if (!post)
          return response.status(400).json({
            message: 'Post does not exists'
          });

        const owner = await PostsService.getPostsOwnerByPostId(post.id);
        const canSee = await UsersService.canSee(owner, user.id);
        if (canSee) {
          await Like.create({entity_id, owner_id: user.id, type: type.id});
          return response.json({message: 'Post liked successfully'});
        } else
          return response.status(400).json({message: 'Profile is private'});

      default:
        return response.status(400).json({message: 'Something went wrong'});
    }
  }

  async unlike({request, response, auth}) {
    const rules = {
      type: 'required|string',
      entity_id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const type = await EntityType.findBy('type', request.input('type'));
    if (!type)
      return response.status(400).json({
        message: 'Type does not exists'
      });

    const entity_id = request.input('entity_id');
    const user = await auth.getUser();

    const like = await Like.query()
      .where('owner_id', user.id)
      .where('entity_id', entity_id)
      .where('type', type.id)
      .first();

    if (!like)
      return response.json({message: 'Like does not exists'});

    switch (type.type) {
      case 'comment': {
        const comment = await Comment.find(entity_id);
        if (!comment)
          return response.status(400).json({
            message: 'Comment does not exists'
          });

        const owner = await PostsService.getPostsOwnerByPostId(comment.post_id);
        const canSee = await UsersService.canSee(owner, user.id);
        if (canSee) {
          await Like.create({entity_id, owner_id: user.id, type: type.id});
          if (await like.delete())
            return response.json({message: 'Comment unliked successfully'});
        } else
          return response.status(400).json({message: 'Profile is private'});
        break;
      }
      case 'post':
        const post = await Post.find(entity_id);
        if (!post)
          return response.status(400).json({
            message: 'Post does not exists'
          });

        const owner = await PostsService.getPostsOwnerByPostId(post.id);
        const canSee = await UsersService.canSee(owner, user.id);
        if (canSee) {
          await Like.create({entity_id, owner_id: user.id, type: type.id});
          if (await like.delete())
            return response.json({message: 'Post unliked successfully'});
        } else
          return response.status(400).json({message: 'Profile is private'});

        break;
      default:
        return response.status(400).json({message: 'Something went wrong'});
    }
  }
}

module.exports = LikeController;
