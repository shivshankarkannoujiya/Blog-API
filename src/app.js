import express from "express";

const app = express();

app.use(express.json({ limit: "16kb" }));

// Routes import
import blogRouter from "./routes/blog.routes.js";

// routes declaration
app.use("/api/v1", blogRouter);

export { app };
