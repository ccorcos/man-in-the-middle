import express from "express";
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";

const args = process.argv.slice(2);

if (args.length !== 2) {
	console.error(
		[
			`Usage: mitm <url> <port>`,
			`Example: mitm http://weather.opensprinkler.com 3344`,
		].join("\n")
	);
}

const PROXY_URL = args[0];
const PORT = parseInt(args[1]);

const app = express();

// Basic server hardening settings including CORS
app.use(helmet());

// Request logging.
// app.use(morgan("dev"));

app.use(express.raw());

// Log request.
app.use((req, res, next) => {
	const message = [req.method, req.path];
	if (req.query) {
		message.push(JSON.stringify(req.query));
	}

	if (req.method !== "GET" && req.body) {
		message.push(req.body);
	}
	console.log("REQUEST:", message.join(" "));

	next();
});

// Proxy and log response.
app.use(
	createProxyMiddleware({
		target: PROXY_URL,
		changeOrigin: true,
		selfHandleResponse: true,
		onProxyRes: (proxyRes, req, res) => {
			let body = "";
			proxyRes.on("data", (chunk) => {
				body += chunk;
			});
			proxyRes.on("end", () => {
				console.log(`RESPONSE:`, body);
				res.send(body);
			});
		},
	})
);

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
