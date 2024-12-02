import { Request, Response, NextFunction } from 'express';
const xss = require('xss');

function sanitizeObject(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'string') {
                obj[key] = xss(obj[key]);
            } else if (typeof obj[key] === 'object') {
                obj[key] = sanitizeObject(obj[key]);
            }
        });
    }
    return obj;
}

module.exports.xssSanitizer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }

    if (req.query) {
        req.query = sanitizeObject(req.query);
    }

    if (req.params) {
        req.params = sanitizeObject(req.params);
    }

    next();
};
