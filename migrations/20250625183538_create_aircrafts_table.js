// No seu arquivo migrations/[TIMESTAMP]_create_aircrafts_table.js
exports.up = function(knex) {
  return knex.schema.createTable('aircrafts', function(table) {
    table.increments('id').primary(); // Primary key, auto-incrementing
    table.string('registration').notNullable().unique(); // Registro da aeronave (ex: "PR-ABC"), único
    table.string('type').notNullable(); // Tipo da aeronave (ex: "Airbus A320")
    table.string('icao_code').notNullable(); // Código ICAO da aeronave (ex: "A320")
    table.string('manufacturer'); // Fabricante (ex: "Airbus")
    table.integer('total_hours').defaultTo(0); // Horas totais da aeronave
    table.string('status').defaultTo('Active'); // Status (ex: 'Active', 'Maintenance', 'Retired')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('aircrafts');
};