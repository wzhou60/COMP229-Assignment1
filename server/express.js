import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/users.routes.js";
import projectRoutes from "./routes/projects.routes.js";


const app = express();
app.use(express.json()); //This middleware parses incoming requests with JSON payloads and makes it avaliable in req.body
app.use(express.urlencoded({ extended: true })); //This middleware parses incoming requests with URL-encoded payloads.
app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", userRoutes);
app.use("/", userRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

export default app;
