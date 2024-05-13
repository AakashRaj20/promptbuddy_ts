import Prompt from "../models/prompts";
import SavedPrompt from "../models/savedPrompts";
import mongoose from "mongoose";
import { Request, Response } from "express";

// get all prompts
export const getAllPrompts = async (req: Request, res: Response) => {
  try {
    const prompts = await Prompt.find({}).populate("creator");
    res.status(200).json(prompts);
  } catch (error: any | unknown) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
};

// create a prompt
export const createPrompt = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = req.body;
  try {
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return res.status(201).json(newPrompt);
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};

// GET post by ID for logged in user
export const getPostLoggedUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return res.status(200).json(prompts);
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};

// GET prompt by ID
export const getPromptById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found." });
    }

    return res.status(200).json(prompt);
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};

// Edit prompt
export const editPrompt = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { prompt, tag } = req.body;

  try {
    const updatePrompt = await Prompt.findByIdAndUpdate(
      id,
      { prompt, tag },
      { new: true, runValidators: true }
    );

    if (!updatePrompt) {
      return res.status(404).json({ message: "Prompt not found." });
    }
    return res.status(200).json({ message: "Prompt updated successfully." });
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete Prompt
export const deletePrompt = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Prompt.findByIdAndDelete(id);
    return res.status(200).json({ message: "Prompt deleted Successfully" });
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};

// Post to save/unsave a prompt
export const toggleSavePrompt = async (req: Request, res: Response) => {
  const { userId, promptId } = req.params;

  try {
    let savedPrompt = await SavedPrompt.findOne({ creator: userId });

    if (!savedPrompt) {
      savedPrompt = new SavedPrompt({
        creator: userId,
        prompts: [],
      });

      await savedPrompt.save();
    }

    const promptObjectId = new mongoose.Types.ObjectId(promptId);

    // check if prompt is already saved
    const promptIndex = savedPrompt.prompts.indexOf(promptObjectId);

    if (promptIndex !== -1) {
      savedPrompt.prompts.splice(promptIndex, 1);
      await savedPrompt.save();
      return res
        .status(200)
        .json({ message: "Prompt removed from saved prompts." });
    } else {
      savedPrompt.prompts.push(promptObjectId);
      await savedPrompt.save();
      return res.status(200).json({ message: "Prompt saved successfully." });
    }
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};

// Get saved prompts
export const getSavedPrompts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const savedPrompt = await SavedPrompt.findOne({ creator: userId })
      .populate("creator") // Populate the 'creator' field outside the 'prompts' array
      .populate("prompts") // Populate the 'prompts' array
      .populate({
        path: "prompts",
        populate: {
          path: "creator",
          model: "User",
        },
      }); // Populate the 'creator' field inside the 'prompts' array
    return res.status(200).json(savedPrompt);
  } catch (error: String | any) {
    return res.status(500).json({ error: error.message });
  }
};

// Post to upvote/downvote a prompt
export const toggleVote = async (req: Request, res: Response) => {
  const { promptId, userId } = req.params;

  try {
    const prompt = await Prompt.findById(promptId);

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const isVoted = prompt.votedBy.includes(userObjectId);

    if (isVoted && prompt.votes > 0) {
      prompt.votes -= 1;
      prompt.votedBy.splice(prompt.votedBy.indexOf(userObjectId), 1);
      await prompt.save();
      return res.status(200).json({
        message: "Vote removed successfully.",
        votes: prompt.votes,
        votedBy: prompt.votedBy,
      });
    } else {
      prompt.votes += 1;
      prompt.votedBy.push(userObjectId);
      await prompt.save();
      return res.status(200).json({
        message: "Vote added successfully.",
        votes: prompt.votes,
        votedBy: prompt.votedBy,
      });
    }
  } catch (error: any | unknown) {
    return res.status(500).json({ error: error.message });
  }
};
