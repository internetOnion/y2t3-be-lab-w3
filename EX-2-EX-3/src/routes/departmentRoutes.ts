import { Router } from "express";
import z from "zod";
import type { Request, Response } from "express";

import AppError from "../utils/AppError.ts";
import courses from "../../data/course.ts";
import { validateParams, validateQuery } from "../middlewares/validate.ts";

const departmentRouter = Router();

const querySchema = z.object({
	level: z.string().min(1).optional(),
	semester: z.string().min(1).optional(),
	instructor: z.string().optional(),
	minCredits: z.coerce.number().min(0).max(4).optional(),
	maxCredits: z.coerce.number().min(0).max(4).optional(),
});

const paramsSchema = z.object({
	dept: z.string().length(3).toUpperCase(),
});

departmentRouter.get(
	"/:dept/courses",
	validateParams(paramsSchema),
	validateQuery(querySchema),
	(req: Request, res: Response) => {
		const { dept } = (req as any).validatedParams as z.infer<
			typeof paramsSchema
		>;
		const { level, minCredits, maxCredits, semester, instructor } = (req as any)
			.validatedQuery as z.infer<typeof querySchema>;

		if (minCredits && maxCredits && minCredits > maxCredits) {
			throw AppError.badRequest("minCredits cannot be greater than maxCredits");
		}

		const specs: Record<string, (course: (typeof courses)[number]) => boolean> =
			{};

		if (level) specs.level = (c) => c.level === level;
		if (minCredits) specs.minCredits = (c) => c.credits >= minCredits;
		if (maxCredits) specs.maxCredits = (c) => c.credits <= maxCredits;
		if (semester) specs.semester = (c) => c.semester === semester;
		if (instructor)
			specs.instructor = (c) =>
				c.instructor.toLowerCase().includes(instructor.toLowerCase());

		const filteredCourses = courses.filter(
			(course) =>
				course.department === dept &&
				Object.values(specs).every((spec) => spec(course)),
		);

		return res.json({
			courses: filteredCourses,
		});
	},
);

export default departmentRouter;
