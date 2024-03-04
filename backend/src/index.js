import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { userRouter } from "./routes/userRouter.js";
import cookieSession from "cookie-session";
import { productRouter } from "./routes/productRouter.js";
// import { userRouter } from "./routes/userRouter.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8888;
const COOKIE_SESSION_SECRET = process.env.COOKIE_SESSION_SECRET;
const app = express();
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

app.set("trust proxy", 1);
const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
const cookieSessionOptions = {
  name: "session",
  secret: COOKIE_SESSION_SECRET,
  httpOnly: true,
  expires: new Date(Date.now() + tenDaysInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};

app.use(cookieSession(cookieSessionOptions));

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static("uploads"));
app.get("/", (_, res) => res.send("it works!"));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const serverListenAtPort = () =>
  app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));

mongoose
  .connect(MONGODB_URL, { dbName: "ID-Picker" })
  .then(() => {
    console.log("Database connection successful");
    serverListenAtPort();
  })
  .catch((error) => {
    console.log("Error connecting to database!");
    console.log(error);
    process.exit();
  });
