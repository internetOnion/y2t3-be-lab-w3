import express from "express";
import type { Request, Response } from "express";
import passport from "passport";

import departmentRouter from "./routes/departmentRoutes.ts";
import authRouter from "./routes/authRoutes.ts";
import errorHandler from "./middlewares/errorHandler.ts";
import { logRequest } from "./middlewares/logger.ts";
import { authenticate } from "./middlewares/authenticate.ts";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);
app.use(passport.initialize());

app.use("/auth", authRouter);

app.use("/departments", authenticate, departmentRouter);

app.use((req: Request, res: Response) => {
	return res.status(404).json({
		status: 404,
		error: "Not Found",
	});
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
