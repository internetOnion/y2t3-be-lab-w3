// Mock user data — in production, replace with a database lookup
const users = [
	{
		id: "1",
		username: "admin",
		// TODO: In production, NEVER store plain-text passwords.
		// Use bcrypt or argon2 to hash passwords.
		password: "admin123",
		role: "admin",
	},
	{
		id: "2",
		username: "user",
		password: "user123",
		role: "user",
	},
] as const;

export default users;
