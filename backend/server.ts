import { Request, Response } from 'express';
require('dotenv').config();
require('express-async-errors');

const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const { notFoundMiddleware } = require('./middleware/not-found');
const { errorHandlerMiddleware } = require('./middleware/error-handler');
const { xssSanitizer } = require('./middleware/xss-sanitizer');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { connectDB } = require('./config/db');
const productRouter = require('./routes/product');

const _dirname = path.resolve();

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssSanitizer);

app.use('/api/v1/products', productRouter);

if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.resolve(_dirname, 'frontend', 'dist')));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    await connectDB();
    app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
};

start();
