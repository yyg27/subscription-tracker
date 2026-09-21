import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      trim: true,
      uniqe: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email adress"], //REGEX for email validation / voodoo magic
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 6,
    },
    telegramId: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

export default User;

// SCHEMA
// {
// name: "Ulfric Stormcloak", 
// mail: "LordOfWindhelm@gmail.com", 
// password: "YsgramorsAxe1922"
// }