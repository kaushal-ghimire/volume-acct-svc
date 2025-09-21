import dotenv from "dotenv";
import app from "./app";
import { appConfig } from "./config/appConfig";

// import { updateRemainingVolume } from "./services/updateRemainingVolume";
// import { migrate } from "./config/database/migrate";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // await migrate();

    // updateRemainingVolume();

    app.listen(PORT, () => {
        console.log(`Server running on ${appConfig.url}:${appConfig.port}`);
    });
};

startServer();