// No seu arquivo migrations/[TIMESTAMP]_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary(); // Primary key, auto-incrementing
    table.string('username').notNullable().unique(); // Nome de usuário, não nulo e único
    table.string('password').notNullable(); // Senha (hash)
    table.string('email').notNullable().unique(); // Email, não nulo e único
    table.string('rank').defaultTo('Cadet'); // Cargo (ex: Cadet, First Officer, Captain)
    table.integer('flight_hours').defaultTo(0); // Horas de voo
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Data de criação
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Data da última atualização
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users'); // Comando para desfazer a migração (ex: para testes)
};