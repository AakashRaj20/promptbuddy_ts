import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    // match: [
    //   /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    // ],
  },
  image: {
    type: String,
  },
});

type UserType = InferSchemaType<typeof UserSchema>;

const User = model<UserType>("User", UserSchema);

export default User;
