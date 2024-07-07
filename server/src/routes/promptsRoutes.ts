import { Router } from "express";
import {
  getAllPrompts,
  createPrompt,
  getPostLoggedUser,
  editPrompt,
  getPromptById,
  deletePrompt,
  toggleSavePrompt,
  getSavedPrompts,
  toggleVote
} from "../controller/prompt.controller";

const promptRouter = Router();

promptRouter.get("/prompts", getAllPrompts);
promptRouter.post("/create-prompt", createPrompt);
promptRouter.get("/user/:id/posts", getPostLoggedUser);
promptRouter.get("/prompt/:id", getPromptById);
promptRouter.delete("/delete-prompt/:id", deletePrompt);
promptRouter.patch("/edit-prompt/:id", editPrompt);
promptRouter.post("/user/:userId/prompt/:promptId/save-unsave", toggleSavePrompt);
promptRouter.get("/user/:userId/saved-prompts", getSavedPrompts);
promptRouter.post("/user/:userId/prompt/:promptId/vote", toggleVote);

export default promptRouter;
