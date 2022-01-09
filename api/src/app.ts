import express from "express";
import cors from "cors";
import logger from "morgan";
import rateLimit from "express-rate-limit";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { friends } from "./routes/friends";
import { messages } from "./routes/messages";
import { users } from "./routes/users";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
const loginLimit: any = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    message: "Too many login attempts. Please try again after a fifteen minutes.",
});

app.use("/api/users/login", loginLimit);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", index);
app.use("/api/friends", friends);
app.use("/api/messages", messages);
app.use("/api/users", users);

app.use(errorNotFoundHandler);
app.use(errorHandler);
