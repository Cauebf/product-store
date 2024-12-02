import { Request, Response } from 'express';

module.exports.notFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).send('Route does not exist');
};
