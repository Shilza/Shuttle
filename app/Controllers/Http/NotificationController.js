'use strict';
const User = use('App/Models/Notification');

class NotificationController {

    async show({ request, response, auth }) {

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

        const notifications = await Notification
            .query()
            .where('receiver_id', user.id)
            .paginate(page, 30);

        response.json(notifications);
    }
}

module.exports = NotificationController;
