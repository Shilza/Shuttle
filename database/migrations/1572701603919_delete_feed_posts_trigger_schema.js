'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */

const Schema = use('Schema');
const Database = use('Database');

class DeleteFeedPostsTriggerSchema extends Schema {
  async up() {
    await Database
      .raw(
        'CREATE TRIGGER `delete_feed_posts` AFTER DELETE ON `friendships`' +
        'FOR EACH ROW DELETE FROM feeds WHERE receiver_id=OLD.subscriber_id AND post_id IN (SELECT id from posts WHERE owner_id = OLD.user_id)'
      );
  }

  async down() {
    await Database
      .raw('DROP TRIGGER `delete_feed_posts`');
  }
}


module.exports = DeleteFeedPostsTriggerSchema
