'use strict'

const Ws = use('Ws');
const Dialog = use('App/Models/Dialog');

const TOPIC_NAME = 'dialogs';

const MESSAGE = 1;
const CONNECTION = 2;
const READ = 3;
const IS_TYPING = 4;

class DialogsController {
  constructor({socket, request, auth}) {
    this.socket = socket;
    this.request = request;

    auth.getUser().then(async data => {
      this.user = data;
    });
  }

  async onMessage({receiverId: receiver_id, type, message}) {

    const topic = Ws
      .getChannel(`${TOPIC_NAME}:*`)
      .topic(`${TOPIC_NAME}:${receiver_id}`);

    switch (type) {
      case CONNECTION:
        await Dialog
          .query()
          .where('receiver_id', this.user.id)
          .where('owner_id', receiver_id)
          .where('read', false)
          .update({read: true})

        if (DialogsController.isReceiverHasMessagesConnection(receiver_id) > 0)
          topic.broadcast('message', {
              type: CONNECTION,
              receiver_id: this.user.id
            }
          )
        break;
      case READ:
        await Dialog
          .query()
          .where('receiver_id', this.user.id)
          .where('owner_id', receiver_id)
          .where('read', false)
          .update({read: true});

        if (DialogsController.isReceiverHasMessagesConnection(receiver_id) > 0)
          topic.broadcast('message', {
              type: READ
            }
          )
        break;
      case MESSAGE:
        const owner_id = this.user.id

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
        break;
      case IS_TYPING:
        if (DialogsController.isReceiverHasMessagesConnection(receiver_id) > 0)
          topic
            .broadcast('message', {
              type: IS_TYPING,
              owner_id: this.user.id
            })
    }
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

module.exports = DialogsController
