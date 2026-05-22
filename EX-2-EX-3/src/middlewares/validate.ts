import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.ts";

export const validateBody = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedBody = schema.parse(req.body);
			req.body = validatedBody;
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				const details = mapIssues(e);

				return next(AppError.badRequest("Invalid request body", details));
			}
			next(e);
		}
	};
};

export const validateParams = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = schema.parse(req.params);
			(req as any).validatedParams = validated;
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				return next(AppError.badRequest("Invalid request params"));
			}
			next(e);
		}
	};
};

export const validateQuery = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = schema.parse(req.query);
			(req as any).validatedQuery = validated;
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				return next(AppError.badRequest("Invalid query parameters"));
			}
			next(e);
		}
	};
};

const mapIssues = (issues: ZodError) =>
	issues.issues.map((issue: any) => ({
		field: issue.path.join("."),
		message: issue.message,
	}));
