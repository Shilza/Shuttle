'use strict';

const Feed = use('App/Models/Feed');
const Post = use('App/Models/Post');
const User = use('App/Models/User');
const Mark = use('App/Models/Mark');
const Friendship = use('App/Models/Friendship');
const LikesService = use('LikesService');
const CompilationsService = use('CompilationsService');

class PostsService {

  async getMarkedPosts(userId, page) {
    const user = await User.find(userId);
    let markedPostsIds = await Mark
      .query()
      .select(['post_id'])
      .where('username', user.username)
      .paginate(page, 12);

    const ids = JSON.parse(JSON.stringify(markedPostsIds.rows)).map(item => item.post_id);

    let posts = await Post
      .query()
      .whereIn('id', ids)
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .notArchived()
      .orderBy('created_at', 'desc')
      .fetch();

    posts.rows = await this._setOwnersInfo(posts.rows);
    posts.rows = await LikesService.setIsLikedPostsInfo(userId, posts.rows);
    posts.rows = await CompilationsService.setSavedInfo(userId, posts.rows);

    markedPostsIds.rows = posts.rows;
    return markedPostsIds;
  }

  async removeMarksByPostId(postId) {
    return Mark
      .query()
      .where('post_id', postId)
      .delete();
  }

  async getPostById(userId, postId) {
    let post =  await Post
      .query()
      .where('id', postId)
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .first();

    if (!post)
      return false;

    post.isLiked = await LikesService.isPostLikedBy(userId, post.id);
    post.isSaved = await CompilationsService.isSavedBy(userId, post.id);

    const owner = await User.find(post.owner_id);
    post.owner = owner.username;
    post.avatar = owner.avatar;

    return post;
  }

  async getPostByCode(code, user) {
    let post = await Post
      .query()
      .where('src', 'like', '%' + code + '%')
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .first();

    if (!post)
      return false;

    post.isLiked = await LikesService.isPostLikedBy(user.id, post.id);
    post.isSaved = await CompilationsService.isSavedBy(user.id, post.id);

    const owner = await User.find(post.owner_id);
    post.owner = owner.username;
    post.avatar = owner.avatar;

    return post;
  }

  async getCompilationsPosts(userId, compilationName, page) {
    const postsIds = await CompilationsService.getPostsIdsByCompilationName(
      userId, compilationName
    );

    let posts = await Post
      .query()
      .whereIn('id', postsIds)
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .orderBy('id', 'desc')
      .paginate(page, 12);

    posts.rows = await this._setOwnersInfo(posts.rows);
    posts.rows = await LikesService.setIsLikedPostsInfo(userId, posts.rows);
    posts.rows = posts.rows.map(item => {
      item.isSaved = true;
      return item;
    });

    return posts;
  }

  async getFeedPosts(userId, page) {
    let posts = await this._getFeedPosts(userId, page);

    posts.data = await this._setOwnersInfo(posts.data);
    posts.data = await LikesService.setIsLikedPostsInfo(userId, posts.data);
    posts.data = await CompilationsService.setSavedInfo(userId, posts.data);

    return posts;
  }

  async contentDistribution(post_id, id) {
    let friends = await Friendship
      .query()
      .where('user_id', id)
      .pluck('subscriber_id');
    friends.push(id);

    const bulkFeed = friends.map(id => {
      return {
        receiver_id: id,
        post_id
      }
    });

    await Feed
      .query()
      .from('feeds')
      .insert(bulkFeed);
  }

  async getArchivedPosts(user, page) {
    const posts = await Post
      .query()
      .where('owner_id', user.id)
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .archived()
      .orderBy('id', 'desc')
      .paginate(page, 12);

    posts.rows = this._setOwnerInfo(user, posts.rows);
    posts.rows = await LikesService.setIsLikedPostsInfo(user.id, posts.rows);

    return posts;
  }

  async getLikedPosts(userId, page) {
    const postsIds = await LikesService.getUsersLikedPosts(userId);

    let likedPosts = await Post
      .query()
      .whereIn('id', postsIds)
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .notArchived()
      .orderBy('id', 'desc')
      .paginate(page, 12);

    likedPosts.rows = await this._setOwnersInfo(likedPosts.rows);
    likedPosts.rows = likedPosts.rows.map(post => {
      post.isLiked = true;

      return post;
    });

    return likedPosts;
  }

  async getPostsOwnerByPostId(postId) {
    const userId = (await Post
      .query()
      .where('id', postId)
      .pluck('owner_id'))[0];

    return await User.find(userId);
  }

  async getPostsOwnerByPostCode(code) {
    let userId = (await Post
      .query()
      .where('src', 'like', '%' + code + '%')
      .pluck('owner_id'))[0];

    if(!userId)
      return false;

    return await User.find(userId);
  }

  async getResultedComments(userId, posts) {
    let comments = [];

    const ent_id = [];
    posts.forEach(post => post.feedComments.forEach(comment => ent_id.push(comment.id)));
    let commentLikes = await LikesService.getCommentsLikes(userId, ent_id);

    let commentsOwnersIds = [];
    posts.forEach(post => post.feedComments.forEach(comment => commentsOwnersIds.push(comment.owner_id)));
    let commentsOwners = await this._getCommentsOwners(commentsOwnersIds);

    posts.forEach(post => {
      comments.push(...this._getResultedComments(
        commentsOwners, commentLikes, post.feedComments)
      );
    });

    return comments;
  }

  async getPostsByOwner(ownerId, userId, page) {
    let posts = await Post
      .query()
      .where('owner_id', ownerId)
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .notArchived()
      .orderBy('id', 'desc')
      .paginate(page, 12);

    const owner = await User.find(ownerId);

    posts.rows = this._setOwnerInfo(owner, posts.rows);
    posts.rows = await LikesService.setIsLikedPostsInfo(userId, posts.rows);
    posts.rows = await CompilationsService.setSavedInfo(userId, posts.rows);

    return posts;
  }

  async _getFeedPosts(userId, page) {
    const posts = await Feed
      .query()
      .select(['post_id'])
      .where('receiver_id', userId)
      .orderBy('created_at', 'desc')
      .paginate(page, 12);

    posts.rows = (await Post
      .query()
      .whereIn('id', posts.rows.map(post => post.post_id))
      .withCount('comments')
      .withCount('likes')
      .with('marks')
      .notArchived()
      .orderBy('created_at', 'desc')
      .fetch()).rows;

    return posts.toJSON();
  }

  async _getPostsOwners(postsIds) {
    const owners = await User
      .query()
      .select(['id', 'username', 'avatar'])
      .whereIn('id', postsIds)
      .fetch();

    return owners.toJSON();
  }

  async _getCommentsOwners(ids) {
    const owners = await User
      .query()
      .select('id', 'username')
      .whereIn('id', ids)
      .fetch();

    return owners.toJSON();
  }

  _getResultedComments(commentsOwners, commentLikes, comments) {
    return comments.map(comment => {
      comment.owner = commentsOwners.find(owner => {
        if (owner.id === comment.owner_id)
          return true
      }).username;

      if (commentLikes) {
        comment.isLiked = !!commentLikes.find(like => {
          if (like.entity_id === comment.id)
            return true;
        });
      }

      return comment;
    });
  }

  _setOwnerInfo(user, posts) {
    return posts.map(post => {
      post.owner = user.username;
      post.avatar = user.avatar;

      return post;
    });
  }

  async _setOwnersInfo(posts) {
    const owners = await this._getPostsOwners(posts.map(post => post.owner_id));

    return posts.map(post => {
      post.owner = this._findUserById(owners, post.owner_id).username;
      post.avatar = this._findUserById(owners, post.owner_id).avatar;

      return post;
    });
  }

  _findUserById(array, id) {
    return array.find(user => user.id === id);
  }
}

module.exports = PostsService;
