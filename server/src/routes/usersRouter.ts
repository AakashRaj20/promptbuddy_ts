import { Router } from "express";
import {
  googleAuthController,
  googleAuthCallbackController,
  githubAuthController,
  githubAuthCallbackController,
  logoutController,
  userDetailController,
} from "../controller/users.controller";
import passport from "passport";
import * as dotenv from "dotenv";

dotenv.config();

const userRouter = Router();

userRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);
userRouter.get("/github", githubAuthController);
userRouter.get("/github/callback", githubAuthCallbackController);
userRouter.get(
  "/signin/success",
  userDetailController
);
userRouter.post("/logout", logoutController);

export default userRouter;
