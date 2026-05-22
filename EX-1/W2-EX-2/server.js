import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	return res.end(`
                    <html>
                        <head><title>Home</title></head>
                        <body>
                            <h1>Welcome to the Home Page</h1>
                            <p>This is a simple Node.js server.</p>
                        </body>
                    </html>
                `);
});

app.get("/about", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	return res.end(`
                    <html>
                        <head><title>About</title></head>
                        <body>
                            <h1>About page</h1>
                            <p>About us: at CADT, we love node.js!</p>
                        </body>
                    </html>
                `);
});

app.get("/contact-us", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	return res.end(`
                    <html>
                        <head><title>Contact Us</title></head>
                        <body>
                            <h1>Contact Us Page</h1>
                            <p>You can reach us vai email...</p>
                        </body>
                    </html>
                `);
});

app.get("/products", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	return res.end(`
                    <html>
                        <head><title>Products Page</title></head>
                        <body>
                            <h1>Products</h1>
                            <p>Buy one get one...</p>
                        </body>
                    </html>
                `);
});

app.get("/projects", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	return res.end(`
                    <html>
                        <head><title>Projects Page</title></head>
                        <body>
                            <h1>Projects Page</h1>
                            <p>Here are our awesome projects</p>
                        </body>
                    </html>
                `);
});

app.use((req, res) => {
	res.writeHead(404, { "Content-Type": "text/plain" });
	return res.end("404 Not Found");
});

app.listen(3000, () => console.log("server running on port 3000"));
