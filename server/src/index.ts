/**
 * Required External Modules
 */
import { connectDb } from "./config/dbConfig";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import promptRouter from "./routes/promptsRoutes";
import userRouter from "./routes/usersRouter";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());

app.use(express.json());

app.use("/api", promptRouter);

app.use("/auth", userRouter);

/**
 * Server Activation
 */


connectDb();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello there the server is running just fine." });
});
