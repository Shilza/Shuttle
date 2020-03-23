const SUITE_NAME = "WS Dialog onMessage";
const {test, trait} = use('Test/Suite')(SUITE_NAME);
const {ioc} = use('@adonisjs/fold');
const User = use('App/Models/User');
const Dialog = use('App/Models/Dialog');
const UsersService = use('UsersService');
const DialogsController = use('App/Controllers/Ws/DialogsController');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test(`${SUITE_NAME} error 401`, async ({client, assert}) => {

  const user = await User.find(1);

  const socket = {};
  const request = {};
  const auth = {
    getUser: () => {
      return new Promise((resolve) => {
        resolve(user);
      });
    }
  };

  const controller = new DialogsController({
    socket,
    request,
    auth
  });

  await delay(2000);
  console.log(await controller.onMessage({
    receiver_id: 2,
    type: 1
  }));
});

