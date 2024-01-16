import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const PORT = 3344;

const app = express();

// Basic server hardening settings including CORS
app.use(helmet());

// Request logging.
app.use(morgan("dev"));

app.use(express.json({ limit: "4mb" }));

// Test endpoint
app.all("*", (req, res) => {
  let body = "";
  if (req.method !== "GET" && req.body) {
    body = "\n" + JSON.stringify(req.body);
  }
  console.log(
    `${req.method} ${req.path}:\n${JSON.stringify(req.query)}${body}`
  );
  res.status(200).send("Good");
});

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
