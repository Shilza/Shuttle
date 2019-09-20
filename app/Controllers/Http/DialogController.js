'use strict'

const {validate} = use('CValidator');
const Dialog = use('App/Models/Dialog');
const User = use('App/Models/User');
const Database = use('Database');

class DialogController {

  async show({request, response, auth, params}) {

    const rules = {
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    let peerId = await User
      .query()
      .select(1)
      .where('username', params.peerUsername)
      .pluck('id');

    peerId = peerId[0]

    if (typeof peerId !== 'number')
      return response.status(400).json({
        message: 'User does not exists'
      });

    const user = await auth.getUser();

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const messages = await Dialog
      .query()
      .where(function () {
        this
          .where('owner_id', user.id)
          .where('receiver_id', peerId)
      })
      .orWhere(function () {
        this
          .where('owner_id', peerId)
          .where('receiver_id', user.id)
      })
      .orderBy('created_at', 'desc')
      .paginate(page, 60);

    messages.rows = messages.rows.reverse();

    return response.json(messages);
  }

  async showAll({request, response, auth}) {
    const rules = {
      page: 'integer'
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails())
      return response.status(400).json({
        message: validation.messages()[0].message
      });

    const user = await auth.getUser();

    let page = parseInt(request.input('page'), 10);
    page = page > 0 ? page : 1;

    const subQuery = Database
      .raw('SELECT MAX(id) FROM dialogs WHERE owner_id = ? OR receiver_id = ? GROUP BY least(owner_id,receiver_id), greatest(owner_id,receiver_id)', [user.id, user.id])

    let dialogs = await Dialog
      .query()
      .whereIn('id', subQuery)
      .orderBy('created_at', 'desc')
      .paginate(page, 12);

    const usersIds = dialogs.rows.map((dialog) => dialog.owner_id === user.id ? dialog.receiver_id : dialog.owner_id);

    let users = await User
      .query()
      .select(['id', 'username', 'avatar'])
      .whereIn('id', usersIds)
      .fetch();

    users = users.toJSON();

    dialogs.rows = dialogs.rows.map(dialog => {
      const a = dialog.owner_id === user.id ? dialog.receiver_id : dialog.owner_id
      dialog.user = users.find(userr => userr.id === a)
      return dialog;
    });

    return response.json(dialogs);
  }
}

module.exports = DialogController
