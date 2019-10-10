'use strict';

const Friendship = use('App/Models/Friendship');
const SubscriptionRequest = use('App/Models/SubscriptionRequest');
const User = use('App/Models/User');
const UsersService = use('UsersService');
const {validate} = use('CValidator');
const FriendshipsService = use('FriendshipsService');

class FriendshipController {

    async follow({request, response, auth}) {

        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const user_id = request.input('id');
        const owner = await User.find(user_id);

        if (!owner)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const requestedBlacklisted = await UsersService.isBlacklisted(user.id, owner.id);
        if(requestedBlacklisted)
            return response.status(400).json({
                message: 'You are is blacklisted'
            });

        if (await FriendshipsService.isFollower(owner.id, user.id))
            return response.status(400).json({
                message: 'Already follow'
            });

        if (owner.private) {
            if (!(await UsersService.isSubscriptionRequest(owner.id, user.id))) {
                await SubscriptionRequest
                    .create({
                        receiver_id: owner.id,
                        subscriber_id: user.id
                    });

                return response.json({
                    message: 'Subscription request successfully sent'
                });
            } else
                return response.status(400).json({
                    message: 'Subscription request already sent'
                });
        }

        await FriendshipsService.create(owner.id, user.id);

        return response.json({message: 'Followed successfully'});
    }

    async unfollow({request, response, auth}) {
        const rules = {
            id: 'required|integer'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails())
            return response.status(400).json({
                message: validation.messages()[0].message
            });

        const user = await auth.getUser();

        const user_id = request.input('id');
        const owner = await User.find(user_id);

        if (!owner)
            return response.status(400).json({
                message: 'User does not exists'
            });

        const requestedBlacklisted = await UsersService.isBlacklisted(user.id, owner.id);
        if(requestedBlacklisted)
            return response.status(400).json({
                message: 'You are is blacklisted'
            });

        const isFollower = await FriendshipsService.isFollower(owner.id, user.id);

        if (owner.private && !isFollower) {
            if (await UsersService.isSubscriptionRequest(owner.id, user.id)) {
                await UsersService.cancelSubRequest(owner.id, user.id);

                return response.json({
                    message: 'Subscription request successfully canceled'
                });
            }
        }

        if (!isFollower)
            return response.status(400).json({
                message: 'Does not follow'
            });

        await FriendshipsService.delete(user_id, user.id);

        return response.json({message: 'Unfollowed successfully'});
    }

    async deleteFollower({request, response, auth}) {
      const rules = {
        id: 'required|integer'
      };

      const validation = await validate(request.all(), rules);

      if (validation.fails())
        return response.status(400).json({
          message: validation.messages()[0].message
        });

      const user = await auth.getUser();

      const user_id = request.input('id');
      const owner = await User.find(user_id);

      if (!owner)
        return response.status(400).json({
          message: 'User does not exists'
        });

      if (!(await FriendshipsService.isFollower(user.id, owner.id)))
        return response.status(400).json({
          message: 'User is not follow you'
        });

      await FriendshipsService.delete(user.id, owner.id);

      return response.json({message: 'Follower removed successfully'});
    }
}

module.exports = FriendshipController;
