'use strict';
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
        await NotificationsService.read(user.id);

        response.json(notifications);
    }
}

module.exports = NotificationController;
