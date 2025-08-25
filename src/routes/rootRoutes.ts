import { Router, Request, Response } from 'express';
import config from '../config/config';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${config.appName}</title>
        <style>
            body, html {
                height: 100%;
                font-family: 'Roboto', sans-serif;
                background-color: #f9f9f9;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                background: #ffffff;
                padding: 60px 80px;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
                text-align: center;
                max-width: 600px;
                width: 90%;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card:hover {
                transform: translateY(-8px);
                box-shadow: 0 30px 70px rgba(0,0,0,0.2);
            }
            h1 {
                font-size: 2rem;
                color: #333333;
                margin-bottom: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            footer {
                font-size: 0.95rem;
                color: #888888;
                margin-top: 25px;
            }
            @media(max-width: 600px) {
                .card { padding: 40px 30px; }
                h1 { font-size: 1.5rem; white-space: normal; }
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>${config.appName}</h1>
            <footer>
                Node.js ${process.version} | Express v${require('express/package.json').version}
            </footer>
        </div>
    </body>
    </html>
    `;
    res.send(htmlContent);
});

export default router;