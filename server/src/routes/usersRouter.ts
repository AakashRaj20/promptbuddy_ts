import { Router } from "express";
import { Request, Response } from "express";
import { logout, userDetail } from "../controller/users.controller";
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
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL as string,
    failureRedirect: `${process.env.CLIENT_URL as string}/signin`,
  })
);

userRouter.get("/logout", logout);

userRouter.get("/signin/success", userDetail);

export default userRouter;
