exports.up = function(knex, Promise) {
  return  Promise.all([

    knex.schema.createTable('basic_information', table => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
              table.json('coordinates');
              table.string('address').notNullable();
              table.string('distance');
              table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    }),

    knex.schema.createTable('comments', function(table) {
              table.increments('id').primary();
              table.string('title').notNullable();
              table.text('body').notNullable();
              table.integer('location_id').notNullable()
                  .references('id')
                  .inTable('basic_information')
                  .onDelete('CASCADE');
              table.dateTime('posted_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
          })
  ])



};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('basic_information'),
    knex.schema.dropTable('comments')
  ])

};
