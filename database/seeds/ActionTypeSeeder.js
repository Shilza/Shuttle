'use strict'

/*
|--------------------------------------------------------------------------
| ActionTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const ActionType = use('App/Models/ActionType');

class ActionTypeSeeder {
    async run() {
        await ActionType.create({id: 1, type: 'like'});
        await ActionType.create({id: 2, type: 'comment'});
        await ActionType.create({id: 3, type: 'follow'});
        await ActionType.create({id: 4, type: 'mark'});
    }
}

module.exports = ActionTypeSeeder
