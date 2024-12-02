import { Request, Response, NextFunction } from 'express';

module.exports.errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.name === 'CastError') {
        const castError = err as unknown as { value: string };
        return res.status(404).json({
            success: false,
            message: `No item found with id: ${castError.value}`,
        });
    }
    return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
};
