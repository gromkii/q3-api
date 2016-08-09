
exports.up = function(knex, Promise) {
  return knex.schema.createTable('listings', table => {
    table.increments().primary().index(),
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade'),
    table.string('item_name'),
    table.text('item_desc'),
    table.float('price'),
    table.text('img_url'),
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listings');
};
