// migrations/[TIMESTAMP]_create_pireps_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pireps', function(table) {
    table.increments('id').primary(); // Chave primária auto-incrementável para o PIREP
    table.integer('user_id').unsigned().notNullable(); // ID do usuário que enviou o PIREP
    table.string('aircraft_registration').notNullable(); // Registro da aeronave
    table.string('aircraft_type').notNullable(); // Tipo da aeronave (e.g., A320)
    table.string('flight_number').notNullable(); // Número do voo
    table.string('origin').notNullable(); // Origem ICAO
    table.string('destination').notNullable(); // Destino ICAO
    table.float('flight_time').notNullable(); // Tempo de voo em horas.minutos
    table.timestamp('date_filed').defaultTo(knex.fn.now()); // Data e hora do registro do PIREP

    // Chave estrangeira para a tabela 'users'
    table.foreign('user_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE'); // Se o usuário for deletado, seus PIREPs também serão
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pireps'); // Comando para reverter a migração (excluir a tabela)
};