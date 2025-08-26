import dotenv from "dotenv";
import app from "./app";
import { updateRemainingVolume } from "./services/updateRemainingVolume";
import { migrate } from "./config/database/migrate";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await migrate();

    updateRemainingVolume();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();



/* test route for nodejs without express */

// import http, { IncomingMessage, ServerResponse } from "http";

// http.createServer((request: IncomingMessage, response: ServerResponse) => {
//     response.writeHead(200, { 'Content-Type': 'text/html' }); // http header
//     response.write("Hello World");
//     response.end();
// }).listen(8080);