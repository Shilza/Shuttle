'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');

class UserSeeder {
  async run () {
    await User.create({username: "test", email: "test@test.com", password: "testtest"});
    await User.create({username: "test1", email: "test1@test.com", password: "testtest"});
  }
}

module.exports = UserSeeder;
