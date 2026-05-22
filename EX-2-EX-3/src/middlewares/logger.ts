import type { Request, Response, NextFunction } from "express";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
	next();
};

export default logRequest;
export { logRequest };
