import { Router, Request, Response } from 'express';

const router = Router();

const config = {
    appName: 'Volume Accounting Service',
    appVersion: '1.0.0'
};

router.get('/', (req: Request, res: Response) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${config.appName}</title>
    </head>
    <body
        style="
            margin: 0;
            padding: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f2f5;
            font-family: sans-serif;
        ">
        <div
            style="
                background: white;
                padding: 40px 60px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                text-align: center;
            ">
            <h2 style="margin: 0; font-size: 2rem; color: #0065b3">
                ${config.appName}
            </h2>
            <footer style="margin-top: 20px; font-size: 1rem; color: #ffb675">
                <strong>Node.js ${process.version} | Express v${require('express/package.json').version}</strong>
            </footer>
        </div>
    </body>
    </html>
    `;
    res.send(htmlContent);
});

export default router;
