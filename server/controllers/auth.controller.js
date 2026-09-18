import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
//req body ===>>> reg.body is an object that contains data from the client (POST request)

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Create a new user by using req.body
    const { name, email, password } = req.body;
    
    //Check if the user already exists
    const existingUser = await User.findOne({ email }); //refering to User model we created

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409; // 409 means there is a conflict
      throw error;
    }

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10); //Salt generally refers to a random string that is used to hash the password
    //10 is the number of rounds of hashing

    const hashedPassword = await bcrypt.hash(password, salt); //hashing the password

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    ); //we attached a session in case of something goes bad we can rollback the transaction

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    }); //jwtSecret is a secret key that we will use to sign the token

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    // If an error occurs, abort the transaction and end session throw an error
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404; //not found
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401; //Unauthorized
      throw error;
    }

    //create a token if password is true

    const token = jwt.sign({ userID: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Implement the signOut controller function with Blacklist method
export const signOut = async (req, res, next) => {
  try {
    res.status(222).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};


 