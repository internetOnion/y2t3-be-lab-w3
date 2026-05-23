import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import z from "zod";

import AppError from "../utils/AppError.ts";
import { signToken } from "../utils/jwt.ts";
import users from "../../data/users.ts";
import { authenticate } from "../middlewares/authenticate.ts";
import { validateBody } from "../middlewares/validate.ts";

const authRouter = Router();

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

authRouter.post(
	"/login",
	validateBody(loginSchema),
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const { username, password } = req.body;

			const user = users.find(
				(u) => u.username === username && u.password === password,
			);

			if (!user) {
				throw AppError.invalidCredentials("Invalid username or password");
			}

			const token = signToken({
				id: user.id,
				username: user.username,
				role: user.role,
			});

			return res.json({ token });
		} catch (err) {
			next(err);
		}
	},
);

authRouter.get("/me", authenticate, (req: Request, res: Response) => {
	const user = (req as any).user;
	return res.json({ user });
});

export default authRouter;
