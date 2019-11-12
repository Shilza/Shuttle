'use strict'

const moment = require('moment');

const Ws = use('Ws');
const Dialog = use('App/Models/Dialog');
const UsersService = use('UsersService');
const {validate} = use('CValidator');

const TOPIC_NAME = 'dialogs';

const MESSAGE = 'MESSAGE';
const CONNECTION = 'CONNECTION';
const READ = 'READ';
const IS_TYPING = 'IS_TYPING';
const ERROR = 'ERROR';
const DELETE = 'DELETE';

class DialogsController {
  constructor({socket, request, auth}) {
    this.socket = socket;
    this.request = request;

    auth.getUser().then(async data => {
      this.user = data;
    });
  }

  async onMessage(data) {
    const {receiverId: receiver_id, type} = data;
    if (!await UsersService.isBlacklisted(this.user.id, receiver_id)) {
      const topic = Ws
        .getChannel(`${TOPIC_NAME}:*`)
        .topic(`${TOPIC_NAME}:${receiver_id}`);

      switch (type) {
        case CONNECTION:
          this.onConnection({topic, data});
          break;
        case READ:
          this.onRead({topic, data});
          break;
        case MESSAGE:
          this.onMsg({topic, data});
          break;
        case IS_TYPING:
          this.onTyping({topic, data});
          break;
        case DELETE:
          this.onDelete({topic, data});
          break;
        default: break;
      }
    }
  }

  async onConnection({topic, data}) {
    const {receiverId} = data;

    await Dialog
      .query()
      .where('receiver_id', this.user.id)
      .where('owner_id', receiverId)
      .where('read', false)
      .update({read: true});

    if (DialogsController.isReceiverHasMessagesConnection(receiverId) > 0)
      topic.broadcast('message', {
          type: CONNECTION,
          receiver_id: this.user.id
        }
      );
  }

  async onRead({topic, data}) {
    const {receiverId} = data;

    await Dialog
      .query()
      .where('receiver_id', this.user.id)
      .where('owner_id', receiverId)
      .where('read', false)
      .update({read: true});

    if (DialogsController.isReceiverHasMessagesConnection(receiverId) > 0)
      topic.broadcast('message', {
          type: READ
        }
      );
  }

  async onMsg({topic, data}) {
    const {message, receiverId: receiver_id} = data;
    const owner_id = this.user.id;

    const rules = {
      receiver_id: 'required|integer',
      message: 'required|string|min:0|max:1000'
    };

    const validation = await validate({receiver_id, message}, rules);

    if (validation.fails()) {
      this.socket.emit('message', {
        type: ERROR,
        error: validation.messages()[0].message
      });
      return;
    }

    await Dialog
      .query()
      .where('receiver_id', this.user.id)
      .where('owner_id', receiver_id)
      .where('read', false)
      .update({read: true});

    const msg = await Dialog.create({
      owner_id,
      receiver_id,
      message
    });

    this.socket.broadcastToAll(`message`, {
      type: MESSAGE,
      message: msg
    });

    if (DialogsController.isReceiverHasMessagesConnection(receiver_id) > 0)
      topic
        .broadcast('message', {
          type: MESSAGE,
          message: {
            ...msg.toJSON(),
            user: {
              id: this.user.id,
              avatar: this.user.avatar,
              username: this.user.username
            }
          }
        });
  }

  async onDelete({data}) {
    const {messageId, receiverId: receiver_id} = data;
    const owner_id = this.user.id;

    const rules = {
      receiver_id: 'required|integer',
      messageId: 'required|integer'
    };

    const validation = await validate({receiver_id, messageId}, rules);

    if (validation.fails()) {
      this.socket.emit('message', {
        type: ERROR,
        error: validation.messages()[0].message
      });
      return;
    }

    if(!(await DialogsController.isOwner(owner_id, messageId))) {
      this.socket.emit('message', {
        type: ERROR,
        error: 'Only owner can delete message'
      });
      return;
    }

    if(await DialogsController.isDayLeft(owner_id, messageId)) {
      this.socket.emit('message', {
        type: ERROR,
        error: 'Message can be deleted only during the day'
      });
      return;
    }

    await Dialog
      .query()
      .where('id', messageId)
      .where('owner_id', owner_id)
      .delete();

    this.socket.broadcastToAll(`message`, {
      type: DELETE,
      messageId
    });
  }

  async onTyping({topic, data}) {
    const {receiverId} = data;

    if (DialogsController.isReceiverHasMessagesConnection(receiverId) > 0)
      topic
        .broadcast('message', {
          type: IS_TYPING,
          owner_id: this.user.id
        });
  }

  static async isOwner(userId, messageId) {
    return !!(await Dialog
      .query()
      .select(1)
      .where('id', messageId)
      .where('owner_id', userId)
      .first());
  }

  static async isDayLeft(ownerId, messageId) {
    const createdAt = (await Dialog
      .query()
      .where('id', messageId)
      .where('owner_id', ownerId)
      .pluck('created_at'))[0];

    return moment().diff(createdAt, 'hours') > 24;
  }

  static isReceiverHasMessagesConnection(receiverId) {
    return Ws.getChannel(`${TOPIC_NAME}:*`).topic(`${TOPIC_NAME}:${receiverId}`) && [...Ws
      .getChannel(`${TOPIC_NAME}:*`)
      .topic(`${TOPIC_NAME}:${receiverId}`)
      .socket
      .channel
      .subscriptions
    ][0][1].size
  }
}

module.exports = DialogsController;
