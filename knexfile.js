// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3', // Define que o cliente do banco de dados é SQLite
    connection: {
      filename: './dev.sqlite3' // O arquivo onde o banco de dados será armazenado
    },
    useNullAsDefault: true, // Necessário para SQLite para definir valores padrão como NULL
    migrations: {
      directory: './migrations' // Onde os arquivos de migração serão armazenados
    },
    seeds: {
      directory: './seeds' // Onde os arquivos de seed (dados iniciais) serão armazenados
    }
  }
  // Você pode adicionar configurações para production, staging, etc., aqui futuramente
};