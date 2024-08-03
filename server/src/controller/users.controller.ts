import { Request, Response } from "express";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
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

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CALLBACK_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // First, try to find a user with the given email
        let user = await User.findOne({ email: profile.emails?.[0].value });

        // If user doesn't exist, create a new one
        if (!user) {
          user = await User.create({
            email: profile.emails?.[0].value,
            username: profile.displayName || `user${profile.id}`, // Fallback username if displayName is not available
            image: profile.photos?.[0].value || "", // Use the profile photo if available
          });

          console.log("New user created:", user);
        } else {
          console.log("Existing user found:", user);
        }

        // Pass the user object to the done callback
        done(null, user);
      } catch (error) {
        console.error("Error in Google authentication:", error);
        done(error as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id); // Use MongoDB _id
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  console.log("Deserialized user:", user);
  
  done(null, user);
});


export const logout = (req: Request, res: Response) => {
  // Check if the user is authenticated
  console.log(req.isAuthenticated());
  
  if (req.isAuthenticated()) {
    // Logout the user
    req.logout((err) => {
      if (err) {
        // If there's an error during logout, send a 500 status
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Error logging out" });
      }

      // Clear the session
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ message: "Error clearing session" });
        }

        // Redirect to the client URL or send a success response
        //res.redirect(CLIENT_URL);
        // Alternatively, you can send a JSON response:
        return res.status(200).json({ message: "Logged out successfully" });
      });
    });
  } else {
    // If the user is not authenticated, just redirect or send a response
    res.redirect(CLIENT_URL);
    // Alternatively, you can send a JSON response:
    // res.status(200).json({ message: "No user to log out" });
  }
};

export const userDetail = async (req: Request, res: Response) => {
  try {
    console.log("User details:", req.user);
    
    if (req.isAuthenticated()) {
      return res.status(200).json({"session": req.user});
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ message: "Error getting user details" });
  }
};


