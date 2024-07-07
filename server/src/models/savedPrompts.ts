import { Schema, model, InferSchemaType } from "mongoose";

const SavedPromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator ID is required."],
  },
  prompts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Prompt",
    },
  ],
});

type SavedPromptType = InferSchemaType<typeof SavedPromptSchema>;

const SavedPrompt = model<SavedPromptType>("Saved_Prompt", SavedPromptSchema);

export default SavedPrompt;
