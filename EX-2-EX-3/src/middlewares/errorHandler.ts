import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError.ts";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json(err.toJSON());
	}

	console.error("Unexpected error: ", err);
	return res.status(500).json({
		success: false,
		error: {
			statusCode: 500,
			message: "Internal Server Error",
		},
	});
};

export default errorHandler;
