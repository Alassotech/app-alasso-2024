import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_ORIGIN } from "./config/index.js";
import { errHandler } from "./middlewares/errorHandler.middleware.js";
import courseRoutes from "./routes/course.routes.js";
import nptelRoutes from "./routes/nptel.routes.js";
import fileRoutes from "./routes/files.routes.js";

const app = express();

app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("App Backend");
});

app.use("/api/v1/app/course", courseRoutes);
app.use("/api/v1/app/nptel", nptelRoutes);
app.use("/api/v1/app/files", fileRoutes);

app.use(errHandler);
export { app };
