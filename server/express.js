import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/users.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import educationRoutes from "./routes/educations.routes.js";
import contactRoutes from "./routes/contacts.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json()); //This middleware parses incoming requests with JSON payloads and makes it avaliable in req.body
app.use(express.urlencoded({ extended: true })); //This middleware parses incoming requests with URL-encoded payloads.
app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", educationRoutes);
app.use("/", contactRoutes);
app.use("/", authRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
