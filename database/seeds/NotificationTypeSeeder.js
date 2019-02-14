'use strict'

/*
|--------------------------------------------------------------------------
| NotificationTypSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const NotificationType = use('App/Models/NotificationType');

class NotificationTypeSeeder {
  async run () {
      await NotificationType.create({id: 1, type: 'like'});
      await NotificationType.create({id: 2, type: 'comment'});
      await NotificationType.create({id: 3, type: 'follow'});
  }
}

module.exports = NotificationTypeSeeder;
