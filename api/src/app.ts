import express from "express";
import cors from "cors";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { friends } from "./routes/friends";
import { messages } from "./routes/messages";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", index);
app.use("/api/friends", friends);
app.use("/api/messages", messages);

app.use(errorNotFoundHandler);
app.use(errorHandler);
