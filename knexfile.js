const path = require('path');
const BASE_PATH = path.join(__dirname, 'server', 'db');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './.data/dev.sqlite3'
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './.data/thebox.sqlite3'
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    },
    useNullAsDefault: true
  }

};
