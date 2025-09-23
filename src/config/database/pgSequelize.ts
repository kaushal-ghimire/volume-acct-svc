import { Sequelize } from 'sequelize';
import { pgDatabaseConfig } from '../database/database';

const pgSequelize = new Sequelize({
    dialect: 'postgres',
    host: pgDatabaseConfig.database.host,
    port: Number(pgDatabaseConfig.database.port),
    username: pgDatabaseConfig.database.username,
    password: pgDatabaseConfig.database.password,
    database: pgDatabaseConfig.database.database,
    schema: pgDatabaseConfig.database.schema,
    logging: false,
    quoteIdentifiers: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default pgSequelize;