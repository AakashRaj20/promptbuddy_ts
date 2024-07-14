import { Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import User from "../models/users";
import * as dotenv from "dotenv";


dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

const CLIENT_URL = process.env.CLIENT_URL as string;
const CALLBACK_URL = process.env.CALLBACK_URL as string;

// Configure Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CALLBACK_URL}/auth/google/callback`,
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const userExists = await User.findOne({
        email: profile.emails?.[0].value,
      });
      if (!userExists) {
        const newUser = await User.create({
          email: profile.emails?.[0].value,
          username: profile.displayName,
          image: profile.photos?.[0].value,
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, userExists);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${CALLBACK_URL}/auth/github/callback`,
    },
    async (profile: any, done: any) => {
      const userExists = await User.findOne({
        email: profile.emails?.[0].value,
      });
      if (!userExists) {
        const newUser = await User.create({
          email: profile.emails?.[0].value,
          username: profile.displayName,
          image: profile.photos?.[0].value,
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, userExists);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

export const googleAuthController = (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};

export const githubAuthController = (req: Request, res: Response) => {
  passport.authenticate("github", { scope: ["profile", "email"] })(req, res);
};

export const googleAuthCallbackController = async (
  req: Request,
  res: Response
) => {
  await passport.authenticate("google", {
    failureRedirect: CLIENT_URL,
  })(req, res, () => {
    res.redirect(CLIENT_URL);
  });
};

export const githubAuthCallbackController = async (
  req: Request,
  res: Response
) => {
  await passport.authenticate("github", {
    failureRedirect: CLIENT_URL,
  })(req, res, () => {
    res.redirect(CLIENT_URL);
  });
};

export const userDetailController = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    
    if (req.user) {
      return res.status(200).json({ session: req.user, Cookie: req.cookies });
    } else {
      return res.status(401).json({ message: "You are not logged in" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutController = (req: Request, res: Response) => {
  req.logout((error) => {
    if (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
    res.redirect(CLIENT_URL);
  });
};
