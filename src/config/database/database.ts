import dotenv from 'dotenv';

dotenv.config();

export const pgDatabaseConfig = {
    /*
    |--------------------------------------------------------------------------
    | Database Configuration
    |--------------------------------------------------------------------------
    */
    database: {
        host: process.env.DB_PG_HOST ?? 'pg-acct-02.wlink.com.np',
        port: parseInt(process.env.DB_PG_PORT || '5434', 10),
        username: process.env.DB_PG_USERNAME ?? 'billing_accounting_svc',
        password: process.env.DB_PG_PASSWORD ?? 'j0ccxY3cecU/G17yTcgqLPPMC',
        database: process.env.DB_PG_DATABASE ?? 'radius',
        schema: process.env.DB_PG_SCHEMA ?? 'public',
    },
};

export const ebillDatabaseConfig = {
    /*
    |--------------------------------------------------------------------------
    | Database Configuration
    |--------------------------------------------------------------------------
    */
    database: {
        host: process.env.DB_HOST ?? 'raddbdev-scan.wlink.com.np',
        port: parseInt(process.env.DB_PORT || '1521', 10),
        username: process.env.DB_USERNAME ?? 'ebill',
        password: process.env.DB_PASSWORD ?? 'Orcl_4Dev',
        database: process.env.DB_DATABASE ?? 'raddb',
        serviceName: process.env.DB_SERVICE_NAME ?? 'raddb',
    },
};