import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    | The name of your application, used in notifications or UI elements.
    */
  name: process.env.APP_NAME ?? "Volume Accounting Service",

  url: process.env.APP_URL ?? "http://localhost",
  port: parseInt(process.env.PORT || "3000", 10),

  timezone: process.env.APP_TIMEZONE ?? "Asia/Kathmandu",

  /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    | Determines the environment in which your application is running.
    */
  env: process.env.APP_ENV || "local",

  /**
    | Logger configuration used by winston logger
    */
  logs: {
    level: process.env.LOG_LEVEL ?? "debug",
  },
};


// import dotenv from 'dotenv';

// dotenv.config();

// const config = {
//     appName: process.env.APP_NAME || 'Volume Accounting Service',
// };

// export default config;