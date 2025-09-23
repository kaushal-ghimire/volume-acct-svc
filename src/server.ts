import dotenv from "dotenv";
import app from "./app";
import { appConfig } from "./config/appConfig";

// import { updateRemainingVolume } from "./services/updateRemainingVolume";
// import { migrate } from "./config/database/migrate";

dotenv.config();

const startServer = async () => {
    const port = appConfig.port;
    // await migrate();

    // updateRemainingVolume();

    app.listen(port, () => {
        console.log(`Server is running at ${appConfig.url}:${port}`);
    });

};

startServer();