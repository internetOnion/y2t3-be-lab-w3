import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import type { Request, Response, NextFunction } from "express";

import { jwtConfig } from "../config/auth.ts";

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtConfig.secret,
};

passport.use(
	new JwtStrategy(opts, (jwtPayload, done) => {
		// in prod i would check if the payload user against the user in the db
		return done(null, jwtPayload);
	}),
);

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err: Error | null, user: Express.User | false) => {
			if (err) return next(err);
			if (!user) {
				return res.status(401).json({
					error: { statusCode: 401, message: "Unauthorized" },
				});
			}
			(req as any).user = user;
			next();
		},
	)(req, res, next);
};
