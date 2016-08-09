
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().index().primary(),
    table.string('username'),
    table.text('avatar_url'),
    table.text('password'),
    table.string('location'),
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
