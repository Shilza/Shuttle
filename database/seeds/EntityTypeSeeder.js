'use strict'

/*
|--------------------------------------------------------------------------
| EntityTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const EntityType = use('App/Models/EntityType');

class EntityTypeSeeder {
    async run() {
        await EntityType.create({id: 1, type: 'post'});
        await EntityType.create({id: 2, type: 'comment'});
    }
}

module.exports = EntityTypeSeeder;
