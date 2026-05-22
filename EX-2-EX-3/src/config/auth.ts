// if prod i would put this in env
export const jwtConfig = {
	secret: "my-super-secret-key-that-should-be-in-env",
	expiresIn: "1h",
} as const;
