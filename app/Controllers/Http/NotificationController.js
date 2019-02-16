'use strict';
const SubscriptionRequestsService = use('SubscriptionRequestsService');
const {validate} = use('CValidator');
const NotificationsService = use('NotificationsService');

class NotificationController {

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

        const notifications = await NotificationsService.getNotifications(user.id, page);

        await this.sleep(3000);
        response.json(notifications);
    }

    sleep(duration) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, duration);
        })
    }
}

module.exports = NotificationController;
