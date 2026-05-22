import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/auth.ts";

export interface JwtPayload {
	id: string;
	username: string;
	role: string;
}

export const signToken = (payload: JwtPayload): string => {
	return jwt.sign(payload, jwtConfig.secret, {
		expiresIn: jwtConfig.expiresIn,
	});
};
