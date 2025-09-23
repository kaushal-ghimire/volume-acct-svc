import oracledb from 'oracledb';
import { ebillDatabaseConfig } from '../database/database';
import { Sequelize } from 'sequelize';

let pool: oracledb.Pool;
// Initialize Oracle Client for Thick mode
if (process.env.NODE_ORACLEDB_THICK_MODE === "true") {
    oracledb.initOracleClient({ libDir: '/opt/oracle/instantclient_23_9' });
}

const oracleSequelize = new Sequelize(
    ebillDatabaseConfig.database.serviceName,
    ebillDatabaseConfig.database.username,
    ebillDatabaseConfig.database.password,
    {
        dialect: 'oracle',
        host: ebillDatabaseConfig.database.host,
        port: ebillDatabaseConfig.database.port,
        dialectOptions: {
            connectString: `${ebillDatabaseConfig.database.host}:${ebillDatabaseConfig.database.port}/${ebillDatabaseConfig.database.serviceName}`,
        },
        quoteIdentifiers: false,
        logging: false,
        pool: {
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 30000,
            maxUses: 1000,
        },
    },
);

export const initEbillConnectionPool = async () => {
    if (!pool) {
        pool = await oracledb.createPool({
            user: ebillDatabaseConfig.database.username,
            password: ebillDatabaseConfig.database.password,
            connectString: `${ebillDatabaseConfig.database.host}:${ebillDatabaseConfig.database.port}/${ebillDatabaseConfig.database.serviceName}`,
            poolMin: 1,
            poolMax: 10,
            poolIncrement: 1,
            poolTimeout: 60,
        });
        console.log('Ebill Oracle connection pool created');
    }
};

export const ebillConnection = async (): Promise<oracledb.Connection> => {
    if (!pool) {
        await initEbillConnectionPool();
    }
    return await pool.getConnection();
};

export default oracleSequelize;