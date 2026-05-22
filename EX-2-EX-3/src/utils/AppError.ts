export interface ErrorDetails {
	field: string;
	message: string;
}

class AppError extends Error {
	constructor(
		public statusCode: number,
		message: string,
		public details?: ErrorDetails[],
	) {
		super(message);
		this.name = "AppError";
		this.details = details;
		Object.setPrototypeOf(this, AppError.prototype);
	}

	toJSON() {
		return {
			error: {
				statusCode: this.statusCode,
				message: this.message,
				...(this.details && { details: this.details }),
			},
		};
	}

	static notFound(message: string) {
		return new AppError(404, message);
	}

	static badRequest(message: string, details?: ErrorDetails[]) {
		return new AppError(400, message, details);
	}

	static resourceNotFound(message: string) {
		return new AppError(404, message);
	}

	static resourceAlreadyExists(message: string) {
		return new AppError(409, message);
	}

	static invalidCredentials(message: string) {
		return new AppError(401, message);
	}

	static unauthorized(message: string) {
		return new AppError(401, message);
	}

	static internalServerError(message: string) {
		return new AppError(500, message);
	}
}

export default AppError;
export { AppError };
