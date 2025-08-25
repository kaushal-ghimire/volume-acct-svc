import dotenv from 'dotenv';

dotenv.config();

const config = {
    appName: process.env.APP_NAME || 'Volume Accounting Service',
};

export default config;