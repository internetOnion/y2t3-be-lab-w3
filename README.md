# EX-2 & EX-3

A simple Express API with JWT authentication and department course listing.

## Mock Users (for login)

| Username | Password   | Role  |
| -------- | ---------- | ----- |
| `admin`  | `admin123` | admin |
| `user`   | `user123`  | user  |

---

## API Routes

### POST `/auth/login`

Authenticate a user and receive a JWT token.

**Request body:**

```json
{
	"username": "admin",
	"password": "admin123"
}
```

**Success Response (200):**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response (401):**

```json
{
	"error": {
		"statusCode": 401,
		"message": "Invalid username or password"
	}
}
```

---

### GET `/auth/me`

Returns the user payload decoded from the JWT.

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**

```json
{
	"user": {
		"id": "1",
		"username": "admin",
		"role": "admin",
		"iat": 1717000000,
		"exp": 1717003600
	}
}
```

**Error Response (401):**

```json
{
	"error": {
		"statusCode": 401,
		"message": "Unauthorized"
	}
}
```

---

### GET `/departments/:dept/courses`

List courses for a department with optional filters.

**Headers:** `Authorization: Bearer <token>`

**Optional query parameters:**

| Parameter    | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| `level`      | string | `"undergraduate"` or `"graduate"`            |
| `semester`   | string | `"fall"` or `"spring"`                       |
| `instructor` | string | Case-insensitive partial match on instructor |
| `minCredits` | number | Minimum credits (0–4)                        |
| `maxCredits` | number | Maximum credits (0–4)                        |

**Example:** `GET /departments/CSE/courses?level=undergraduate&semester=fall`

**Success Response (200):**

```json
{
	"courses": [
		{
			"id": "CSE101",
			"title": "Introduction to Data Science",
			"department": "CSE",
			"level": "undergraduate",
			"credits": 3,
			"instructor": "Dr. KimAng",
			"semester": "fall"
		}
	]
}
```

**Error Response (400) — invalid department param:**

```json
{
	"error": {
		"statusCode": 400,
		"message": "Invalid request params"
	}
}
```

**Error Response (400) — minCredits > maxCredits:**

```json
{
	"error": {
		"statusCode": 400,
		"message": "minCredits cannot be greater than maxCredits"
	}
}
```

---

## Error Format

All errors follow this shape:

```json
{
	"error": {
		"statusCode": 400,
		"message": "Description of the error",
		"details": [{ "field": "username", "message": "Username is required" }]
	}
}
```

---

## Getting Started

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`.
