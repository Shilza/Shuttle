'use strict';

const {validate} = use('CValidator');
const SubscriptionRequestsService = use('SubscriptionRequestsService');
const FriendshipsService = use('FriendshipsService');

class SubscriptionRequestController {

  async preview({request, response, auth}) {
    const user = await auth.getUser();

    const subsRequestsCount = await SubscriptionRequestsService.getSubRequestsCount(user.id);
    let subscriptionsRequests;
    if (subsRequestsCount) {
      const avatar = await SubscriptionRequestsService.getAvatarOfLastSubscriber(user.id);
      subscriptionsRequests = {
        avatar: avatar,
        count: subsRequestsCount
      };
    }

    response.json(subscriptionsRequests);
  }

  async show({request, response, auth}) {
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
    const requests = await SubscriptionRequestsService.getRequests(user.id, page);

    return response.json(requests);
  }

  async accept({request, response, auth}) {
    const rules = {
      user_id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();
    const subscriberId = request.input('user_id');
    const isReqExists = await SubscriptionRequestsService.isRequestExists(user.id, subscriberId);

    if (!isReqExists)
      return response.status(400).json({
        message: 'Subscription request does not exists'
      });

    await FriendshipsService.create(user.id, subscriberId);
    await SubscriptionRequestsService.delete(user.id, subscriberId);

    response.json({
      message: 'Subscription request accepted'
    });
  }

  async deny({request, response, auth}) {
    const rules = {
      user_id: 'required|integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();
    const subscriberId = request.input('user_id');
    const isReqExists = await SubscriptionRequestsService.isRequestExists(user.id, subscriberId);

    if (!isReqExists)
      return response.status(400).json({
        message: 'Subscription request does not exists'
      });

    await SubscriptionRequestsService.delete(user.id, subscriberId);

    response.json({
      message: 'Subscription request canceled'
    });
  }
}

module.exports = SubscriptionRequestController;
