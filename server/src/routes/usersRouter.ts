import { Router } from "express";
import {
  googleAuthController,
  googleAuthCallbackController,
  githubAuthController,
  githubAuthCallbackController,
  logoutController,
  userDetailController,
} from "../controller/users.controller";

const userRouter = Router();

userRouter.get("/google", googleAuthController);
userRouter.get("/google/callback", googleAuthCallbackController);
userRouter.get("/github", githubAuthController);
userRouter.get("/github/callback", githubAuthCallbackController);
userRouter.get("/signin/success", userDetailController);
userRouter.get("/logout", logoutController);

export default userRouter;
