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

const userRouter = Router();

userRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http:localhost:3000" }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);
userRouter.get("/github", githubAuthController);
userRouter.get("/github/callback", githubAuthCallbackController);
userRouter.get(
  "/signin/success",
  passport.authenticate("google"),
  userDetailController
);
userRouter.get("/logout", logoutController);

export default userRouter;
