
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments().primary().index(),
    table.integer('sender_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade'),
    table.integer('reciever_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade'),
    table.string('message_title'),
    table.text('message_body'),
    table.boolean('hidden').defaultTo('false'),
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
