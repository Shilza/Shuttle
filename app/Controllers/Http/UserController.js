'use strict';

const User = use('App/Models/User');
const UsersService = use('UsersService');
const FriendshipsService = use('FriendshipsService');
const NotificationsService = use('NotificationsService');
const SubscriptionRequestsService = use('SubscriptionRequestsService');
const CloudinaryService = use('App/Services/CloudinaryService');

class UserController {

  async isNameUnique({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      username: 'required|string|min:2|max:12|regex:^[a-z0-9]+$'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const currentUser = await auth.getUser();
    if (currentUser.username === request.input('username'))
      return response.json({
        unique: true
      });

    const user = await User
      .query()
      .select(1)
      .where('username', request.input('username'))
      .first();

    if (user)
      return response.json({
        unique: false,
        message: 'Username already exists'
      });

    response.json({
      unique: true
    });
  }

  async show({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      username: 'required|string|min:2|max:12'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let user = await User.query()
      .where('username', request.input('username'))
      .withCount('posts', (builder) => {
        builder.where('archive', false)
      })
      .withCount('followers')
      .withCount('follows')
      .first();

    if (!user)
      return response.status(400).json({
        message: 'User does not exists'
      });

    const me = await auth.getUser();
    user.friendshipState = await UsersService.getFriendshipState(user.id, me.id);
    user.canSee = await UsersService.canSee(user, me.id);
    user.blacklisted = await UsersService.isBlacklisted(user.id, me.id);
    user.amBlacklisted = await UsersService.isBlacklisted(me.id, user.id);

    response.json(user);
  }

  async update({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      username: 'string|min:2|max:12|regex:^[a-z0-9]+$',
      bio: 'string|max:100',
      site: 'string|max:50'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();

    const availableFields = [
      'username', 'bio', 'site'
    ];

    let dataForUpdate = {};
    Object.entries(request.all()).forEach(entry => {
      if (availableFields.includes(entry[0]) && user[entry[0]] !== entry[1]) {
        dataForUpdate[entry[0]] = entry[1];
      }
    });

    if (!Object.keys(dataForUpdate).length)
      return response.status(400).json({
        message: 'Nothing to update'
      });

    if (dataForUpdate.hasOwnProperty('username')) {
      const username = await User
        .query()
        .select(1)
        .where('username', dataForUpdate.username)
        .first();

      if (username)
        return response.status(400).json({
          message: 'Username already exists'
        });
    }

    let isUpdated = await User
      .query()
      .where('id', user.id)
      .update(dataForUpdate);

    if (isUpdated) {
      const updatedUser = await User.query()
        .where('id', user.id)
        .withCount('posts', (builder) => {
          builder.where('archive', false)
        })
        .withCount('followers')
        .withCount('follows')
        .first();
      updatedUser.unreadDialogs = await UsersService.unreadDialogs(updatedUser.id);
      updatedUser.notificationsCount = await NotificationsService.getNotificationsCount(updatedUser.id);

      return response.json({
        message: 'Updated successfully',
        user: updatedUser
      });
    }

    response.status(400).json({
      message: 'Something went wrong'
    });
  }

  async updateAvatar({request, response, auth}) {

    const {v4: uuidv4} = require('uuid');

    const user = await auth.getUser();

    const profilePic = request.file('avatar', {
      types: ['image'],
      size: '10mb',
      subtypes: ['jpg', 'jpeg']
    });

    if(!profilePic)
      return response.status(400).json({message: 'avatar is required'});

    const cdnOptions = {resource_type: profilePic.type, public_id: `${user.id}/${uuidv4()}`};
    const cdnResult = await CloudinaryService.v2.uploader.upload(profilePic.tmpPath, cdnOptions);

    user.avatar = cdnResult.url;
    user.save();

    response.json({
      message: 'Avatar successfully updated',
      avatar: user.avatar
    });
  }

  async deleteAvatar({request, response, auth}) {
    const user = await auth.getUser();

    user.avatar = null;
    user.save();

    response.json({
      message: 'Avatar successfully deleted',
    });
  }

  async followers({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      id: 'required|integer',
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await User.find(request.input('id'));
    if (!user)
      return response.status(400).json({message: 'User does not exists'});

    const requester = await auth.getUser();

    const canSee = await UsersService.canSee(user, requester.id);
    if (canSee) {
      const followers = await UsersService.getFollowers(user, page);
      return response.json(followers);
    } else
      return response.json({private: true});
  }

  async follows({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      id: 'required|integer',
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await User.find(request.input('id'));
    if (!user)
      return response.status(400).json({message: 'User does not exists'});

    const requester = await auth.getUser();

    const canSee = await UsersService.canSee(user, requester.id);
    if (canSee) {
      const follows = await UsersService.getFollows(user, page);
      return response.json(follows);
    } else
      return response.json({private: true});
  }

  async followersSearch({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      user_id: 'required|integer',
      username: 'required|string|max:12',
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await User.find(request.input('user_id'));
    if (!user)
      return response.status(400).json({message: 'User does not exists'});

    const requester = await auth.getUser();

    const canSee = await UsersService.canSee(user, requester.id);
    if (canSee) {
      const followers = await FriendshipsService.searchFollowers(
        user.id, page, request.input('username')
      );
      return response.json(followers);
    } else
      return response.json({private: true});
  }

  async followsSearch({request, response, auth}) {
    const {validate} = use('CValidator');

    const rules = {
      user_id: 'required|integer',
      username: 'string|max:12',
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const user = await User.find(request.input('user_id'));
    if (!user)
      return response.status(400).json({message: 'User does not exists'});

    const requester = await auth.getUser();

    const canSee = await UsersService.canSee(user, requester.id);
    if (canSee) {
      const follows = await FriendshipsService.searchFollows(
        user.id, page, request.input('username')
      );
      return response.json(follows);
    } else
      return response.json({private: true});
  }

  async makePrivate({request, response, auth}) {

    const user = await auth.getUser();

    if (user.private)
      return response.status(400).json({
        message: 'Account already is private'
      });

    user.private = true;
    await user.save();

    response.json({
      message: 'Account is now private'
    });
  }

  async makePublic({request, response, auth}) {
    const user = await auth.getUser();

    if (!user.private)
      return response.status(400).json({
        message: 'Account already is public'
      });

    user.private = false;
    await user.save();

    await SubscriptionRequestsService.allowAllRequests(user.id);

    response.json({
      message: 'Account is now public'
    });
  }
}

module.exports = UserController;
